package routes

import (
	controllers "app_trilha/Controllers"

	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {
	app.Get("/api/User", controllers.User)

	app.Post("/download", controllers.GeneratePdf)

	app.Post("/Register", controllers.Register)

	app.Post("/Login", controllers.Login)

	app.Post("/Logout", controllers.Logout)
}
