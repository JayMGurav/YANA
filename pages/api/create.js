import { v4 as uuidv4 } from 'uuid'

import redis from '../../lib/redis'

export default async function upvote(req, res) {
  const { note, color } = req.body

  if (!note) {
    res.status(400).json({
      error: 'Note can not be empty',
    })
  } else if (note.length < 200) {
    const id = uuidv4()
    const newEntry = {
      id,
      note,
      color,
      created_at: Date.now(),
    }

    await redis.hset('notes', id, JSON.stringify(newEntry))
    res.status(200).json({
      body: 'success',
    })
  } else {
    res.status(400).json({
      error: 'Max 200 characters please.',
    })
  }
}
