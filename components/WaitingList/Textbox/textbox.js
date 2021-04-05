import styles from './textbox.module.css'

const Textbox = ({...props}) => {
    return (
        <div>
            <input className={styles.textbox} type="text" {...props} />
        </div>
    );
}

export default Textbox