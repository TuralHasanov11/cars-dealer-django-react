import React, { useState } from 'react';

export const messageTypes = {
  SUCCESS: "success",
  ERROR: "error"
}

export default function useMessages() {

  const [messages, setMessages] = useState([])
  
  return {result: Array.isArray(messages) && messages?.map((msg, index) => (
    <div key={index} className={`alert alert-${msg.type===messageTypes.SUCCESS?"success":"danger"} d-flex`} role="alert">
      {msg.type === messageTypes.SUCCESS && <i className="fi-check-circle me-2 me-sm-3 lead"></i>}
      {msg.type === messageTypes.ERROR && <i className="fi-x-circle me-2 me-sm-3 lead"></i>}
      <div>{msg.message}</div>
    </div>)), setMessages}
}
