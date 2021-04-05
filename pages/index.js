import Head from 'next/head'
import Nav from '../components/Layout/Nav/nav'
import WaitingList from '../components/WaitingList/waitingList'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>TicketMaster</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav/>
      <div className={styles.grid}>
        <div></div>
        <WaitingList />
      </div>
      
    </div>
  )
}
