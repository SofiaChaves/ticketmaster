import React from 'react'
import About from './About/about'
import styles from './band.module.css'
import Cover from './Cover/cover'

const Band = () => {
    return (
        <div className={styles.bandContainer}>
            <Cover />
            <About />
        </div>
    )
}

export default Band
