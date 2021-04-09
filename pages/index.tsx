import Head from 'next/head';

import Navbar from '../components/Nav';
import Header from '../components/Header';
import Notes from '../components/Notes';

export default function Home() {
  return (
    <div>
      <Head>
        <title>📝 YANA</title>
      </Head>
      <div className="grid">
        <Navbar/>
        <Header />
        <Notes />
      </div>
    </div>
  )
}








