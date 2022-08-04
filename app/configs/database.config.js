import mongoose from 'mongoose'
import { API } from '../globals.js'

export default function connect () {
  mongoose
    .connect(API.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log('Successfully connected to database')
    })
    .catch((error) => {
      console.log('DB Connection failed. exiting now...')
      console.error(error)
      process.exit(1)
    })
}
