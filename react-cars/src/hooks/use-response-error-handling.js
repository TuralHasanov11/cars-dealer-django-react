import { useState } from "react"


export const useResponseErrorHandling = ({response, successStatus})=>{

    const [err, setErr] = useState()
    const messages = []
    const result = handleResponse(response)
    
    const handleResponse = (response) => {
        
    }

    return {
        value:inputState.value, 
    }
}
