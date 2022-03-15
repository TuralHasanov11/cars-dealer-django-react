import { createContext, useState } from "react";

const MessagesContext = createContext({
    message:[],
    setMessage:()=>{}
})

export function MessagesContextProvider(props){

    const [message, setMessage] = useState({})

    return <MessagesContext.Provider value={{
        message,
        setMessage,
    }}>
        {props.children}
    </MessagesContext.Provider>
}

export default MessagesContext
