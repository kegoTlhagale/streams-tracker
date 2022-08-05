import { API } from '../globals.js'
import swaggerJSDoc from 'swagger-jsdoc'

const host = `localhost:${API.PORT}`

const swDef = {
  info: {
    title: 'Streams Tracker Service',
    version: '1.0.0',
    description: 'A service that prevents a user from watching more than 3 video streams concurrently'
  },
  host,
  basePath: '/',
  schemes: ['http', 'https'],
  definitions: {}
}

const options = {
  swaggerDefinition: swDef,
  apis: ['./app/routes/*.js']
}

export default swaggerJSDoc(options)
