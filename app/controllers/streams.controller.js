import { HTTP_CODES } from '../globals.js'

const track = async (req, res) => {
  console.log('reaches')
  return res.status(HTTP_CODES.OK)
    .json({
      success: true
    })
}

export { track }
