package controllers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/johnfercher/maroto/pkg/consts"
	"github.com/johnfercher/maroto/pkg/pdf"
)

func GeneratePdf(c *fiber.Ctx) error {

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

	//Download test
	c.Set("Content-type", "attachment; filename=certificate.pdf")
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
