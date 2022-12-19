package main

import (
	database "app_trilha/Database"
	routes "app_trilha/Routes"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
)

func main() {
	// TODO "Error loading .env file"
	Err := godotenv.Load()
 	
	if Err != nil {
   	 log.Fatal("Error loading .env file")
 	}

	database.Connect()

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
	}))

	routes.Setup(app)

	app.Listen(":3000")
}
