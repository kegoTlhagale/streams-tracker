import { track } from '../controllers/streams.controller.js'
import express from 'express'
const router = express.Router()

/**
 * @swagger
 * /api/stream:
 *   post:
 *     description: track number of concurrent streams
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             streamid:
 *               type: string
 *             streamsCounterUpdate:
 *               type: number
 *     example:
 *         streamid: emp1234566
 *         streamsCounterUpdate: 1
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad request. Stream ID and streamsCounterUpdate are missing or are incorrect.
 *       500:
 *         description: Unexpected error
 *
 */
router.post('/', track)

export default router
