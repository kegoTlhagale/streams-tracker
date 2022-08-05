import mongoose from 'mongoose'

const streamsSchema = new mongoose.Schema({
  streamid: { type: String, unique: true },
  streamsCounter: { type: Number }
})

export default mongoose.model('streams', streamsSchema)
