import swaggerJsDoc from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'PlanetX Blockchain Backend',
      version: '1.0.0'
    }
  },
  schemes: ['http'],

  host: 'localhost:3000',

  apis: ['./routes/*/*.js'] // files containing annotations as above
}

const openapiSpecification = swaggerJsDoc(options)

export default openapiSpecification
