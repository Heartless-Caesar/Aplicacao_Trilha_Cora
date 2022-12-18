# Backend Trilha de Cora

## Elementos necessários

Para executar este código é necessário ter Go instalado em sua máquina.

Primeiramente vá para o endereço https://go.dev/doc/install em que é possível encontrar
o download apropriado para seu SO de preferência.

### Linux:

Para Linux é possível encontrar Golang nos repositórios de sua distribuição de preferência e após instalar utilizar o
comando para verificar se foi instalado corretamente:

- Ubuntu:

```Bash
sudo apt install golang-go
go -v
```

- Fedora:

```Bash
sudo dnf install golang-go
go -v
```

### Mac

No link acima tem o pkg apropriado para installer Go em sua máquina com MacOS.
Posteriormente utilize o comando abaixo para verificar se a Golang foi isntalada corretamente.

```zsh
go -v
```

### Windows:

No Windows basta baixar o executável que ele irá te guiar durante toda a instalação.

## Executando a aplicação

Ao realizar o download dos arquivos verifique se os arquivos **god.mod** e **go.sum** estão presentes,
caso estejam execute o comando:

```Bash
go mod download
```

Após buscar todas as dependências basta utilizar o comando:

```Bash
go run main.go
```
