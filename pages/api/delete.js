import { v4 as uuidv4 } from 'uuid'

import redis from '../../lib/redis'

export default async function createNote(req, res) {
  const { id } = req.body

  if (!id) {
    res.status(400).json({
      error: 'id can not be null',
    })
  } 
  try {
    await redis.hdel('notes', id);
    res.status(200).json({
      body: 'success',
    });
  } catch (error) {
    res.status(400).json({
      error: 'Error deleting: '+ error.message,
    })
  }
}
