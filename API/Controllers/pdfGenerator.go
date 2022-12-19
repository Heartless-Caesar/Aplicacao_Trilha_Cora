package controllers

import (
	"fmt"

	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
	"github.com/johnfercher/maroto/pkg/consts"
	"github.com/johnfercher/maroto/pkg/pdf"
)

func GeneratePdf(c *fiber.Ctx) error {
	
	user_cookie := c.Cookies("jwt")
	
	token, err := jwt.Parse(user_cookie, func(token *jwt.Token) (interface{}, error) {
		 return []byte("secretKey"), nil
	 })
	 
	if err != nil {
		c.Status(fiber.StatusInternalServerError)
		return c.JSON(fiber.Map{
			"message" : "Unable to get token",
		})
	}

	payload := token.Claims.(jwt.MapClaims)

	//Criando o novo PDF
	m := pdf.NewMaroto(consts.Landscape, consts.A4)

	//Valores das margens
	m.SetPageMargins(10, 10, 10)

	//Salvando o arquivo
	errr := m.OutputFileAndClose(fmt.Sprintf("pdfs/%s-certificate.pdf", payload["email"]))

	if errr != nil {
		c.Status(fiber.StatusInternalServerError)
		return c.JSON(fiber.Map{
			"message": "Could not create PDF",
		})
	}


	/*
	  * Added payload with user email for certificate file name
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
