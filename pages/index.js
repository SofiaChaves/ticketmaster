import Head from 'next/head'
import Band from '../components/Band/band'
import Nav from '../components/Layout/Nav/nav'
import Tickets from '../components/Tickets/tickets'
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

        <Band/>
        
        <div className={styles.ticketsWrapper}>
          <Tickets/>
          <hr/>
          <WaitingList />
        </div>

      </div>
      
    </div>
  )
}
