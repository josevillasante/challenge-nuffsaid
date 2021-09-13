import React, { useEffect, useState } from 'react'
import { Message } from '../../Api';
import StyledSnackbar from '../../styled-components/StyledNackbar';

export const Snackbar = ({message}: {message: Message}) => {
  const [displayError, setDisplayError] = useState(true);

  useEffect(() => {
    if(displayError === false) {
      setDisplayError(true)
    } else {
      setTimeout(() => {
        setDisplayError(false)
      }, 2000);
    }
  }, [message]);

  const removeError = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setDisplayError(false);
  }

  const SnackbarMessage = ({message, onClick}: {message: Message, onClick: React.MouseEventHandler<HTMLElement>}) => {
    return (
      <div className="snackbar-error-container">
        <button className="snackbar-error-close" onClick={onClick}>X</button>
        <div className="error-message-container">
          <p>error:</p>
          <p>{message.message}</p>
        </div>
      </div>
    )
  };

  return (
    <>
      <StyledSnackbar>
        <h1 className="heading">nuffsaid.com Coding Challenge</h1>
        {(displayError && message !== undefined) && (<SnackbarMessage message={message} onClick={removeError}/>)}
      </StyledSnackbar>
    </>
  )
}
