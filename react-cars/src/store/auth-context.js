import {useState, createContext} from 'react'
import axiosInstance from '../axios'

const AuthContext = createContext({
    user:{},
    isAuth:false,
    accessToken:null,
    refreshToken:null,
    wishlist:[],
    setUser:()=>{},
    setAccessToken: ()=>{},
    setRefreshToken: ()=>{},
    getUser: ()=>{},
    clearWishlist: ()=>{},
    toggleCarToWishlist: ()=>{},
})

export function AuthContextProvider(props){

    const [accessToken, setAccessToken] = useState()
    const [refreshToken, setRefreshToken] = useState()
    const [user, setUser] = useState()
    // const isAuth = accessToken&&id&&user
    const isAuth = accessToken

    const [wishlist, setWishlist] = useState([])

    async function getUser(id){

        if(!isAuth){
            return true
        }

        try {
            const {data} = await axiosInstance.get(`auth/${id}`)
            setUser({...user, ...data})
        } catch (error) {
            throw error
        }
    }

    function toggleCarToWishlist(carId){
        if(wishlist.includes(carId)){
            clearWishlist(carId)
        }else{
            wishlist.push(carId)
        }
    }

    function clearWishlist(item=null){
        if(!item){
            setWishlist([])
        }else{
            setWishlist((prev)=>prev.filter(car=>{return item !== car}))
        }
    }

    return <AuthContext.Provider value={{
        user,
        isAuth,
        accessToken,
        setAccessToken,
        setRefreshToken,
        refreshToken,
        wishlist,
        setUser,
        clearWishlist,
        toggleCarToWishlist,
        getUser,
    }}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext