package routes

import (
	controllers "app_trilha/Controllers"

	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {
	app.Post("/Register", controllers.Register)

	app.Post("/Login", controllers.Login)

	app.Get("/api/User", controllers.User)

	app.Post("/Logout", controllers.Logout)
}
