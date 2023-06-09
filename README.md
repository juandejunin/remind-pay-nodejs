# remind-pay-nodejs

## API Rest de la aplicacion REMIND PAY construida en NodeJs

## Instalar nodejs
https://nodejs.org/es/download

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

  ## Register - Post

  ### http://localhost:<PORT>/api/users/register

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


En caso de registro exitoso retorna un email con un link para verigicar la cuenta

## Login - Post
Una vez realizada la verificacion de la cuenta mediante el link enviado al correo electronico se puede acceder al login
### http://localhost:<PORT>/api/users/login

Recibe un json:
{
    "email": "elmatedelabuela@gmail.com",
    "password": "password"
}

Retorna un json:

{
    "success": true,
    "data": {
        "id": "6438f15d0d1c149e4264b565",
        "name": "name surname",
        "username": "abuela",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Mzk1ZTdmZjU0Y2VkN2Q0NGQ1OWIzNiIsIm5hbWUiOiJuYW1lIHN1cm5hbWUiLCJpYXQiOjE2ODE0ODQwMTYsImV4cCI6MTY4MTUyNzIxNn0.9PEyibsBrB0vSaYkOvJdks9tQTlXSkJiX0yOJQhtl-4"
    },
    "errorMsg": null
}

Este token retornado en este json sera el que deberemos usar para autenticarnos.

## Modificar datos del usuario - Patch

http://localhost:8080/api/users/:id

### Recibe el id del usuario por parametro, por ejemplo 
http://localhost:8080/api/users/64395e7ff54ced7d44d59b36

### Recibe Headers
Key : Authorization
Value: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Mzk1ZTdmZjU0Y2VkN2Q0NGQ1OWIzNiIsIm5hbWUiOiJuYW1lIHN1cm5hbWUiLCJpYXQiOjE2ODE0ODQwMTYsImV4cCI6MTY4MTUyNzIxNn0.9PEyibsBrB0vSaYkOvJdks9tQTlXSkJiX0yOJQhtl-4

### Este Value esta compuesto por la palabra "bearer" y dejando un espacio pegar el token obtenido de el login

### Un json con las modificaciones requeridas

{
    "name": "nuevonombre"
}


## Recuperer contraseña olvidada - POST


http://localhost:8080/api/users/forgot-password

### Recibe un json con el correo electronico:

{
    "email": "elmatedelabuela@gmail.com"
}

### Retorna un json con el id y el token para resetear la contraseña

{
    "success": true,
    "data": {
        "msg": "You have requested to change your password",
        "id": "64395e7ff54ced7d44d59b36",
        "cryptoToken": "61deafd5b495e052a731649d3bf18292"
    },
    "errorMsg": null
}


## Resetear la contraseña - POST

http://localhost:8080/api/users/reset

### Recibe headers obtenidos en la respuesta anterior:

Key: userid        Value: 64395e7ff54ced7d44d59b36

Key: cryptotoken    Value: 61deafd5b495e052a731649d3bf18292

### Recibe por Body un Json:

{    
    "password":"newpassword"
}


### Retorna un json con el resultado de la solicitud

{
    "success": true,
    "data": {
        "msg": "The password has been updated"
    },
    "errorMsg": null
}
