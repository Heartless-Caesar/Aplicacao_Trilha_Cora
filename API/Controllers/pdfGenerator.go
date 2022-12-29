package controllers

import (
	database "app_trilha/Database"
	models "app_trilha/Models"
	configutils "app_trilha/Utils"
	"fmt"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
	"github.com/johnfercher/maroto/pkg/color"
	"github.com/johnfercher/maroto/pkg/consts"
	"github.com/johnfercher/maroto/pkg/pdf"
	"github.com/johnfercher/maroto/pkg/props"
)

func GeneratePdf(c *fiber.Ctx) error {

	cookie := c.Cookies("user")

	token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(configutils.EnvConfigs.SecretKey), nil
	})

	if err != nil {
		c.Status(fiber.StatusUnauthorized)
		return c.JSON(fiber.Map{
			"message": "Unauthorized",
		})
	}

	claims := token.Claims.(*jwt.StandardClaims)

	var user models.User

	database.DB.Where("id = ?", claims.Issuer).First(&user)

	//Criando o novo PDF
	m := pdf.NewMaroto(consts.Landscape, consts.A4)

	//Valores das margens
	m.SetPageMargins(20, 10, 20)

	buildHeader(m)

	//Salvando o arquivo
	errr := m.OutputFileAndClose(fmt.Sprintf("pdfs/certificado_%s.pdf", user.Username))

	if errr != nil {
		c.Status(fiber.StatusInternalServerError)
		return c.JSON(fiber.Map{
			"message": "Could not create PDF",
		})
	}

	return c.Download(fmt.Sprintf("./pdfs/certificado_%s.pdf", user.Username))
}

func buildHeader(m pdf.Maroto) {
	m.RegisterHeader(func() {
		m.Row(50, func() {
			//Imagem do header
			m.Col(12, func() {
				err := m.FileImage("../Assets/caminho-de-cora-black.png", props.Rect{
					Center:  true,
					Percent: 75,
				})

				if err != nil {
					fmt.Print("Something went wrong in the header image creation", err)

				}
			})
		})

		//Primeira linha após a imagem
		m.Row(10, func() {
			m.Col(12, func() {
				m.Text("A Associação Caminho de Cora Coralina certifica que:", props.Text{
					Top:   3,
					Align: consts.Center,
				})
			})
		})
	})
}

func getNameSigningColor(m pdf.Maroto, c *fiber.Ctx) color.Color {
	return color.Color{
		Red:   199,
		Green: 150,
		Blue:  114,
	}
}
