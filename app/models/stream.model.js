import mongoose from 'mongoose'

const streamsSchema = new mongoose.Schema({
  user: { type: String, unique: true },
  streamsCounter: { type: Number }
})

streamsSchema.statics.findOneOrCreate = function findOneOrCreate (condition, doc) {
  const newDocument = doc
  return new Promise((resolve, reject) => {
    return this.findOne(condition)
      .then((result) => {
        if (result) {
          return resolve(result)
        }
        return this.create(newDocument)
          .then((result) => {
            return resolve(result)
          }).catch((error) => {
            return reject(error)
          })
      }).catch((error) => {
        return reject(error)
      })
  }).catch((error) => {
    return { error }
  })
}

export default mongoose.model('levels', streamsSchema)
