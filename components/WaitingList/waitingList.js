import React, { useState } from "react"
import ErrorMessage from "./ErrorMessage/errorMessage"
import Textbox from "./Textbox/textbox"
import styles from "./waitingList.module.css"

const WaitingList = () => {
  let isComplete = null;

  const [errorMessage, setErrorMessage] = useState();
  const [isSuccessBoxVisible, setIsSuccessBoxVisible] = useState(false);

  const clearErrorMessage = () => setErrorMessage(null);

  const submit = async event => {
    event.preventDefault()
    setErrorMessage(null);

    var email = event.target?.elements["email"]?.value;
    var phone = event.target?.elements["phone"]?.value;

    if (!email || !phone){
        setErrorMessage("Email and mobile number must be provided");
        return;
    }

    const res = await fetch(
      '/api/waiting-list',
      {
        body: JSON.stringify({
          emailAddress: email,
          mobileNumber: phone
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }
    )

    const result = await res.json()
    if (res.status != 200) {
      setErrorMessage(result?.message);
      return;
    } else {
      setIsSuccessBoxVisible(true);
      return;
    }
  }

  return (
    <form onSubmit={submit}>
      <h1 className={styles.title}>Waiting List</h1>
      <div className={styles.rectangle} />
      <p className={styles.text} data-testid="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
      {isSuccessBoxVisible ?
        <div className={styles.successBox} data-testid="successMessage">
          <p>You have successfully been added to the waitting list. You will receive an email confirming into email@outlook.com</p>
        </div>
      : 
        <div>
          {errorMessage ? <ErrorMessage text={errorMessage} /> : null}
          <Textbox id="email" name="email" type="email" placeholder="Email Address" onChange={clearErrorMessage} data-testid="email"/>
          <Textbox id="phone" name="phone" type="phone" placeholder="Phone Number" onChange={clearErrorMessage} data-testid="phone" />
          <button className={styles.btn} type="submit" data-testid="submit">Get into waiting list</button>
        </div>
      }
    </form>
  );
}

export default WaitingList
