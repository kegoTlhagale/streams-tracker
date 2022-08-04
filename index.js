import express from 'express'

const app = express()
app.use(express.json())

const serviceName = 'Streams Tracker'
const port = 3000

/** health check/server ping route */
app.get('/', (_, res) => res.send('Streams Tracker Service'))

app.listen(port, () => {
  console.log(`${serviceName} server listening on port ${port}!`)
})
