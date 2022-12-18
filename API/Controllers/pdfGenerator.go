package controllers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/johnfercher/maroto/pkg/consts"
	"github.com/johnfercher/maroto/pkg/pdf"

	"net/http"
)

func GeneratePdf(c *fiber.Ctx, w http.ResponseWriter) error {

	//Criando o novo PDF
	m := pdf.NewMaroto(consts.Landscape, consts.A4)

	//Valores das margens
	m.SetPageMargins(10, 10, 10)

	//Salvando o arquivo
	err := m.OutputFileAndClose("pdfs/output.pdf")

	if err != nil {
		c.Status(fiber.StatusInternalServerError)
		return c.JSON(fiber.Map{
			"message": "Could not create PDF",
		})
	}

	//Download test
	w.Header().Set("Content-Disposition", "attachment; filename=certificate.pdf")

	w.Header().Set("Content-Type", c.GetRespHeader("Content-Type"))

	return c.JSON(fiber.Map{
		"message": "PDF created",
	})
}

// func buildHeader(m pdf.Maroto) {
// 	m.RegisterHeader(func() {
// 		m.Row(50, func() {
// 			m.Col(12, func() {

// 			})
// 		})
// 	})
// }
