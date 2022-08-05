/* eslint-disable prefer-promise-reject-errors */
import { HTTP_CODES } from '../globals.js'
import Streams from '../models/stream.model.js'
import logger from '../utilities/logger.js'

const track = async (req, res) => {
  const { streamid, streamsCounterUpdate } = req.body
  const permittedUpdates = [-1, 1]

  logger.log(`${streamid} Validating the payload`)
  if (!streamid) {
    return res.status(HTTP_CODES.BAD_REQUEST).json({
      success: false,
      message: 'Missing stream id'
    })
  }

  // ensure that the update value is a 1 to increment the streams counter or a zero to decrement the streams counter
  if (!permittedUpdates.includes(streamsCounterUpdate)) {
    return res.status(HTTP_CODES.BAD_REQUEST).json({
      success: false,
      message: 'Invalid or missing increment/decrement value'
    })
  }

  logger.log(`${streamid} The payload is valid.`)
  logger.log(`${streamid} Check if the stream already exists`)
  Streams.findOne({ streamid }, (error, existingStream) => {
    console.log('1')
    if (error) {
      logger.error(`${streamid}something went wrong while searching for the stream. \n`, error)
      return res.status(HTTP_CODES.SERVER_ERROR)
      .json({
        success: false,
        message:  `Oops... something went wrong. Please try again later`
      })
    }

    if (existingStream) {
      logger.log(`${streamid} The stream exists`)
      updateCurrentStreamsCounter(res, existingStream, streamsCounterUpdate)
    } else {
      logger.log(`${streamid} The stream does exists`)
      createStream(res, streamid, streamsCounterUpdate)
    }
  })
}

const createStream = (res, streamid, streamsCounterUpdate) => {
  if (streamsCounterUpdate < 0) {
    logger.log(`${streamid} There are no active streams tracked`)

    return res.status(HTTP_CODES.OK)
    .json({
      success: true,
      limitExceed: false,
      streamid,
      concurrentStreams: 0
    })
  }

  if (streamsCounterUpdate === 1) {
    logger.log(`${streamid} creating new stream`)

    Streams.create({ streamid, streamsCounter: streamsCounterUpdate }, (error, newStream) =>{
      if (error) {
        logger.error(`${streamid} Something went wrong while creating new stream. \n`, error)
  
        return res.status(HTTP_CODES.SERVER_ERROR)
        .json({
          success: false,
          message:  `Oops... something went wrong. Please try again later`
        })
      }
  
      let limitExceed = false
      if (newStream.streamsCounter >= 3) {
        limitExceed = true
      }
      return res.status(HTTP_CODES.OK)
      .json({
        success: true,
        limitExceed,
        streamid,
        concurrentStreams: newStream.streamsCounter
      })
    })
  }
}

const updateCurrentStreamsCounter = (res, existingStream, streamsCounterUpdate) => {

  console.log('existingStream', existingStream)
  console.log('streamsCounterUpdate', streamsCounterUpdate)

  const { streamsCounter, streamid } = existingStream
  logger.log(`${streamid} Checking if the number of concurrent streams has not exceeded 3`)

  if (streamsCounterUpdate === 1 && streamsCounter >= 3) {
    logger.log(`${streamid} Too many concurrent streams`)

    // send response if there are already 3 stream. Also accounts for when there is more
    return res.status(HTTP_CODES.OK)
    .json({
      success: true,
      limitExceed: true,
      streamid,
      concurrentStreams: streamsCounter
    })
  } else {
      if (streamsCounterUpdate === 1)
        logger.log(`${streamid} Concurrent streams are still below the limit. Increment the number of streams by 1`)

      if (streamsCounterUpdate === -1)
        logger.log(`${streamid} A stream is no longer active. Decrement the number of streams by one`)
        
      // increment/decrement streams counter
      let newStreamsCounter = streamsCounter + streamsCounterUpdate

      // if the counter is a negative value, set it to zero
      if (newStreamsCounter < 0) {
        newStreamsCounter = 0
      }

      console.log('existingStream.streamsCounter', existingStream.streamsCounter)
      console.log('streamsCounter', streamsCounter)
      console.log('newStreamsCounter', newStreamsCounter)
      
       // update the counter in the db
      existingStream.updateOne({ streamsCounter: newStreamsCounter },(error, updatedStream) => {
        if (error) {
          logger.error(`${streamid} Something went wrong while updating for the stream. \n`, error)
    
          return res.status(HTTP_CODES.SERVER_ERROR)
          .json({
            success: false,
            message:  `Oops... something went wrong. Please try again later`,
          })
        }

        console.log('updatedStream', updatedStream)
        let limitExceed = false
        if (updatedStream.streamsCounter >= 3) {
          limitExceed = true
        }
        return res.status(HTTP_CODES.OK)
        .json({
          success: true,
          limitExceed,
          streamid,
          concurrentStreams: newStreamsCounter
        })
      })
  }
}



export { track }
