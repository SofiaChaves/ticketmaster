import React from 'react'
import styles from './ticketsTable.module.css'

const TicketsTable = () => {
    return (
        <div className={styles.ticketsTable}>
            <div className={`${styles.row} ${styles.disabled}`}>
                <div>
                    <h2>Balcony</h2>
                    <span>£33.85 each</span>
                </div>
                <button>Sold Out</button>
            </div>
            <div className={`${styles.row} ${styles.disabled}`}>
                <div>
                    <h2>Stalls Row B</h2>
                    <span>£35.85 each</span>
                </div>
                <button>Sold Out</button>
            </div>
            <div className={styles.row}>
                <div>
                    <h2>Stalls Row A</h2>
                    <span>£37.85 each</span>
                </div>
                <button>Buy Now</button>
            </div>
        </div>
    )
}

export default TicketsTable
