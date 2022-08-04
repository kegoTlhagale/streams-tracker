import { track } from '../controllers/streams.controller.js'
import express from 'express'
const router = express.Router()

router.post('/', track)

export default router
