package configutils

import (
	"log"

	"github.com/spf13/viper"
)

type EnvConfig struct {
	LocalServerPort string `mapstructure:"LOCAL_SERVER_PORT"`
	SecretKey       string `mapstructure:"SECRET_KEY"`
}

//Call variables from this variable
var EnvConfigs *EnvConfig

//Loads the desired env file
func loadEnvVariables() (config *EnvConfig) {
	//PATH
	viper.AddConfigPath(".")

	//NAME
	viper.SetConfigName("app")

	//TYPE
	viper.SetConfigType("env")

	//READ variables in the desired file
	if err := viper.ReadInConfig(); err != nil {
		log.Fatal("Error reading env file", err)
	}

	//Config to struct
	if err := viper.Unmarshal(&config); err != nil {
		log.Fatal(err)
	}

	return config
}

//Initialize this function in main so that env variables are usable in the whole app
func InitEnvConfigs() {
	EnvConfigs = loadEnvVariables()
}
