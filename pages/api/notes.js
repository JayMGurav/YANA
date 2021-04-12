import redis from '../../lib/redis'

export default async function getNotes(req, res) {
  const notes = (await redis.hvals('notes'))
    .map((entry) => JSON.parse(entry))

  res.status(200).json({ notes })
}
