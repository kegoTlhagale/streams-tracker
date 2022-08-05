/* eslint-disable prefer-promise-reject-errors */
import { HTTP_CODES } from '../globals.js'
import Stream from '../models/stream.model.js'
// import logger from '../helpers/logger.js'

const track = async (req, res) => {
  const { user, streamsCounterUpdate } = req.body
  const permittedUpdates = [-1, 1]

  if (!user) {
    return res.status(HTTP_CODES.BAD_REQUEST).json({
      success: false,
      message: 'Missing user id'
    })
  }

  if (permittedUpdates.includes(streamsCounterUpdate)) {
    return res.status(HTTP_CODES.BAD_REQUEST).json({
      success: false,
      message: 'Invalid or missing increment/decrement value'
    })
  }

  /** Promise chain that does the following
    - check if the level exists
    - if the level exists, return a message that the level already exists
    - if level does not exist, create it, and return a message that the level was created successfully
  */

  return new Promise((resolve, reject) => {
    Stream.findOne({ user }, (error, existingUser) => {
      if (error) {
        return reject({
          status: HTTP_CODES.SERVER_ERROR,
          message: `Something went wrong while retrieving stream for account ${user}`
        })
      }

      resolve(existingUser)
    })
  }).then((existingUser) => {
    if (streamsCounterUpdate === 1 && existingUser.streamsCounter >= 3) {
      /* throw error "too many concurrent streams" */
    } else if (streamsCounterUpdate === 1 && existingUser.streamsCounter >= 3) {
      /* throw error "too many concurrent streams" */
    } else if (streamsCounterUpdate === -1 && existingUser.streamsCounter >= 3) {}

    return res.status(HTTP_CODES.OK)
      .json({
        success: true,
        data: { ...existingUser }
      })
  }).catch((error) => {
    return res.status(error.status || HTTP_CODES.SERVER_ERROR)
      .json({
        success: false,
        message: error.message || 'Oops... Something went wrong while trying to track stream.'
      })
  })

  // if (userInDatabase && streamCountChange === 1 && currentStreams < 3) {
  //     /*update userId's currentStreams + 1 in database*/
  //   } else if (!userInDatabase && streamCountChange === 3) {
  //     /*throw error "too many concurrent streams"*/
  //   } else if (userInDatabase && streamCountChange === -1 && currentStreams === 1) {
  //     /*delete row in database*/
  //   } else if (userInDatabase && streamCountChange === -1 && currentStreams > 1) {
  //     /*update userId's currentStreams - 1 in database*/
  //   }

//   return res.status(HTTP_CODES.OK)
//     .json({
//       success: true
//     })
}

export { track }
