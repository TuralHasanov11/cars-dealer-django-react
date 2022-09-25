import {useState, createContext} from 'react'
import axios from '../axios'


const UserContext = createContext({
    user:{},
    cars:[],
    getUserAndCars:()=>{},
})

export function UserContextProvider(props){

    const [user, setUser] = useState({})
    const [cars, setCars] = useState([])


    async function getUserAndCars(id, params){
        await Promise.all([axios.get(`auth/${id}`), axios.get(`auth/${id}/cars`, {params})])
            .then(responses=>{
                setUser(responses[0].data)
                setCars(responses[1].data)
            })
            .catch(errors => {
                return errors
            });
    }

    return <UserContext.Provider value={{
        user,
        cars,
        getUserAndCars,
    }}>
        {props.children}
    </UserContext.Provider>
}

export default UserContext