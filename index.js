import express from 'express'
import swaggerUi from 'swagger-ui-express'

import { API } from './app/globals.js'
import mongo from './app/configs/database.config.js'
import spec from './app/configs/swagger.config.js'
import streamsRoutes from './app/routes/streams.routes.js'

const app = express()
app.use(express.json())
mongo()

const serviceName = 'Streams Tracker'
const port = API.PORT

/** health check/server ping route */
app.get('/', (_, res) => res.send('Streams Tracker Service'))

app.listen(port, () => {
  console.log(`${serviceName} server listening on port ${port}!`)
})

app.use('/api/stream', streamsRoutes)

// app.get('/swagger.json', (_, res) => {
//   res.setHeader('Content-Type', 'application/json')
//   res.send(spec)
// })

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spec))
