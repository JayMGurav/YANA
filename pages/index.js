import Head from 'next/head';
import useSWR from 'swr'
import redis from '../lib/redis'

import Navbar from '../components/Nav';
import Header from '../components/Header';
import Notes from '../components/Notes';



const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Home({notes}) {
  const { data, error } = useSWR('/api/notes', fetcher, {
    initialData: { notes },
  })

  if(error){
    console.log({error});
  }

  return (
    <div>
      <Head>
        <title>YANA</title>
      </Head>
      <div className="grid">
        <Navbar/>
        <Header />
        <Notes notes={data?.notes}/>
      </div>
    </div>
  )
}




export async function getServerSideProps() {
  const notes = (await redis.hvals('notes'))
    .map((entry) => JSON.parse(entry))

  return { props: { notes } }
}



