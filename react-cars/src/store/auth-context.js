import {useState, createContext} from 'react'


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
    changePassword: ()=>{}
})

export function AuthContextProvider(props){

    const [accessToken, setAccessToken] = useState()
    const [refreshToken, setRefreshToken] = useState()
    const [user, setUser] = useState()
    // const isAuth = accessToken&&id&&user
    const isAuth = accessToken

    const [wishlist, setWishlist] = useState([])

    function toggleCarToWishlist(car){
        if(wishlist.includes(car)){
            clearWishlist(car)
        }else{
            wishlist.push(car)
        }
    }

    function clearWishlist(item=null){
        if(!item){
            setWishlist([])
        }else{
            setWishlist((prev)=>prev.filter(car=>{return item !== car}))
        }
    }

    function changePassword(){

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
        changePassword
    }}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext