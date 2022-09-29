import {useState, createContext} from 'react'

const UserContext = createContext({
    user:{},
    cars:[],
    setUser:()=>{},
    setCars:()=>{}
})

export function UserContextProvider(props){

    const [user, setUser] = useState({})
    const [cars, setCars] = useState([])

    return <UserContext.Provider value={{
        user,
        cars,
        setUser,
        setCars
    }}>
        {props.children}
    </UserContext.Provider>
}

export default UserContext