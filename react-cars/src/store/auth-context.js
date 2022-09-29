import {useState, createContext} from 'react'


const AuthContext = createContext({
    user:{},
    isAuth:false,
    accessToken:null,
    refreshToken:null,
    wishlist:[],
    csrfToken:null,
    setUser:()=>{},
    setAccessToken: ()=>{},
    setRefreshToken: ()=>{},
    getUser: ()=>{},
    setCSRFToken:()=>{},
    setWishlist:()=>{},
    wishlistIds:[]
})

export function AuthContextProvider(props){

    const [accessToken, setAccessToken] = useState()
    const [refreshToken, setRefreshToken] = useState()
    const [user, setUser] = useState()
    const [csrfToken, setCSRFToken] = useState()
    const isAuth = user

    const [wishlist, setWishlist] = useState([])
    const wishlistIds = wishlist?.map(el => el.id)

    return <AuthContext.Provider value={{
        user,
        isAuth,
        accessToken,
        setAccessToken,
        setRefreshToken,
        refreshToken,
        wishlist,
        csrfToken,
        setCSRFToken,
        setUser,
        setWishlist,
        wishlistIds
    }}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext