import React from 'react'
import styles from './nav.module.css'

const Nav = () => {
    return (
        <div className={styles.nav}>
            <img className={styles.logo} src='/ticketmaster-logo.svg'/>
        </div>
    )
}

export default Nav
