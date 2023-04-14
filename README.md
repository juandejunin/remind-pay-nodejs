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

## Inicializar

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