# remind-pay-nodejs

## API Rest de la aplicacion REMIND PAY construida en NodeJs
### Dependencias utilizadas:
express
express-validator
bcrypy
mongoose
cors
nodemon
dotenv
standard
jsonwebtoken
nodemailer

## Clonar repositorio

https://github.com/juandejunin/remind-pay-nodejs.git

## Instalar dependencias

npm i 

## Crear directorio .env en la raiz del proyecto

PORT = XXXX
URL_MONGO = //en este lugar pegar la contraseña de mongo atlas //
JWT_SECRET_KEY = 'xxxxxxxxxxxxx'
EMAIL_ACCOUNT = "xxxxxxxxxx@xxxxxx.xxx"
EMAIL_PASSWORD = "xxxxxxxxxxxxxxxxxxx"

URL_SIGNIN= 'https://www.marca.com/' //estas url son de ejemplo. Luego seran remplazadas por urls del frontend 
URL_REGISTER= 'https://www.youtube.com/'

### Como configurar eslint:
npm i standard
en json agragar las siguientes lineas

  "eslintConfig": {
    "extends": "./node_modules/standard/eslintrc.json"
  },

  ## Levantar el servidor
  npm run dev

  # Endpoint

  http://localhost:<PORT>/api/users/register

  Recibe un json:

  {
    "username": "username",
    "name": "name,
    "email": "email@gmail.com",
    "password": "password"
}

retorna un json:

{
    "success": true,
    "data": {
        "msg": "Registered successfully. You must verify the account. Check your mail",
        "id": "6438f15d0d1c149e4264b565"
    },
    "errorMsg": null
}


## En caso de registro exitoso retorna un email con un link para verigicar la cuenta