import { useState } from 'react';
import { MessageItem } from "./components/message/MessageItem";
import { useEffect } from 'react';
import generateMessage, { Message } from './Api';
import GlobalStyles from "./styled-components/GlobalStyles";
import { Snackbar } from "./components/snackbar/Snackbar";
import { Button } from '@material-ui/core';

export const MessageList = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const cleanUp = generateMessage((message: Message) => {
      setMessages(oldMessages => [...oldMessages, message]);
    });
    return cleanUp;
  }, [setMessages]);

  const renderToggleButton = () => {
    return (
      <Button
      type="button"
      color="secondary"
      variant="contained">Start</Button>
    )
  }

  const renderSnackBar = () => {
    const errors = messages.filter(i => i.priority === 0);
    return (
      <Snackbar message={errors[errors.length - 1]}/>
    )
  }
  
  const renderMessageType = (type: string, priority: Number) => {
    const messageType = messages.filter(i => i.priority === priority);
    return (
      <>
        <h2>{type} Type {priority}</h2>
        <p className="error-count-text">Count {messageType.length}</p>
        <div className="container">
          {
            messageType.map((i, key) => (
              <MessageItem
                key={key}
                type={i.priority}
                message={i.message} />
            ))
          }
        </div>
      </>
    )
  }

  return (
    <div className={"app"}>
      <GlobalStyles />
      { renderSnackBar() }
      <div className={"buttons-container"}>
        { renderToggleButton() }
        <Button
          variant="contained"
          color="secondary"
          onClick={() => { setMessages([]) }}
        >Clear</Button>
      </div>
      <div className="messages-container">
        <div className="errors">
          { renderMessageType("Error", 0) }
        </div>
        <div className="warnings">
          { renderMessageType("Warning", 1) }
        </div>
        <div className='info'>
          { renderMessageType("Info", 2) }
        </div>
      </div>
    </div>
    )
}
