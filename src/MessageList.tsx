import React, { useState } from 'react';
import { MessageItem } from "./MessageItem";
import { useEffect } from 'react';
import generateMessage, { Message } from './Api';
import GlobalStyles from "./styled-components/GlobalStyles";
import { cleanup } from '@testing-library/react';

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
      <button>
      </button>
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
      <div className={"buttons-container"}>
      { renderToggleButton() }
      <input
        type="button"
        onClick={() => { setMessages([]) }}
        value="Clear" />
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
