import React from 'react'
import styles from './title.module.css'

const Title = ({ children, xlTitle }) => {
    return (
        <>
            <h1 className={`${styles.title} ${xlTitle ? styles.xlTitle : ''}`}>{children}</h1>
            <div className={styles.rectangle} />            
        </>
    )
}

export default Title
