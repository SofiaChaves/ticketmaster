import styles from "./errorMessage.module.css"

const ErrorMessage = ({text}) => {
    return (
        <div className={styles.container} data-testid="errorMessage">
            {text}
        </div>
    )
}

export default ErrorMessage
