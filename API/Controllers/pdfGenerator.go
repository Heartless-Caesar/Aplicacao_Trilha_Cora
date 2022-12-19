package controllers

import (
	"fmt"
	"log"
	"os"

	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
	"github.com/johnfercher/maroto/pkg/consts"
	"github.com/johnfercher/maroto/pkg/pdf"
	"github.com/joho/godotenv"
)

func GeneratePdf(c *fiber.Ctx) error {
  	Err := godotenv.Load(".env")
 	
	if Err != nil {
   	 log.Fatal("Error loading .env file")
 	}
	
	//Criando o novo PDF
	m := pdf.NewMaroto(consts.Landscape, consts.A4)

	//Valores das margens
	m.SetPageMargins(10, 10, 10)

	//Salvando o arquivo
	err := m.OutputFileAndClose("pdfs/certificate.pdf")

	if err != nil {
		c.Status(fiber.StatusInternalServerError)
		return c.JSON(fiber.Map{
			"message": "Could not create PDF",
		})
	}

	user_cookie := c.Cookies("jwt")
	token, err := jwt.Parse(user_cookie, func(token *jwt.Token) (interface{}, error) {
        return []byte(os.Getenv("SECRET_KEY")), nil
    })
	
	payload := token.Claims.(jwt.MapClaims)

	/*
	  * Added payload with user email for personalized certificate name
	*/
	c.Set( "Content-type", fmt.Sprintf("attachment; filename=%s-certificate.pdf", payload["email"]))
	c.Response().Header.ContentType()

	return c.Download("./pdfs/certificate.pdf")
}

// func buildHeader(m pdf.Maroto) {
// 	m.RegisterHeader(func() {
// 		m.Row(50, func() {
// 			m.Col(12, func() {

// 			})
// 		})
// 	})
// }
