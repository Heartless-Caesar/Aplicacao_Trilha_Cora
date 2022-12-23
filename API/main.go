package main

import (
	database "app_trilha/Database"
	routes "app_trilha/Routes"
	configutils "app_trilha/Utils"
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	configutils.InitEnvConfigs()

	database.Connect()

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
	}))

	routes.Setup(app)
	
	port := fmt.Sprintf(":%s",configutils.EnvConfigs.LocalServerPort)

	app.Listen(port)
}
