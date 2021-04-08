import redis from '../lib/redis'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Notes({ notes }) {
   
  return (
    <main></main>
  )
}

export async function getServerSideProps({ req }) {
  const notes = (await redis.hvals('notes'))
    .map((entry) => JSON.parse(entry))

  return { props: { notes } }
}
