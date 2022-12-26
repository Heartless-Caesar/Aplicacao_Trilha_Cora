package main

import (
	database "app_trilha/Database"
	routes "app_trilha/Routes"
	configutils "app_trilha/Utils"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/limiter"
)

func main() {
	configutils.InitEnvConfigs()

	database.Connect()

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
	}))

	app.Use(limiter.New(limiter.Config{
		Max: 20,
		Expiration: 30 * time.Second,
	}))

	routes.Setup(app)

	app.Listen(configutils.EnvConfigs.LocalServerPort)
}
