import mongoose from 'mongoose'
import { API } from '../globals.js'
import logger from '../utilities/logger.js'

export default function connect () {
  mongoose
    .connect(API.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      logger.log('Successfully connected to database')
    })
    .catch((error) => {
      logger.log('DB Connection failed. exiting now...')
      logger.error(error)
      logger.exit(1)
    })
}
