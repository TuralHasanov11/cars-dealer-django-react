import {useState, createContext, useMemo} from 'react'
import Cookies from "universal-cookie"
import axiosInstance from '../axios'

const cookies = new Cookies()

const AuthContext = createContext({
    user:{},
    isAuth:false,
    accessToken:null,
    refreshToken:null,
    wishlist:[],
    id:null,
    register:()=>{},
    login:()=>{},
    logout:()=>{},
    getUser:()=>{},
    clearWishlist:()=>{},
    toggleCarToWishlist:()=>{},
})

export function AuthContextProvider(props){

    const [accessToken, setAccessToken] = useState(cookies.get('access_token'))
    const [refreshToken, setRefreshToken] = useState(cookies.get('refresh_token'))
    const [user, setUser] = useState()
    const [id, setId] = useState(cookies.get('user_id'))
    const isAuth = accessToken&&id&&user

    const [wishlist, setWishlist] = useState([])


    async function login(formData){

        try {
            const res = await axiosInstance.post(`user/token`, {
				email: formData.email,
				password: formData.password,
			})

            if(res.status==200){
                
                const {user_id} = JSON.parse(atob(res.data.access.split('.')[1]));

                setId(user_id)
                cookies.set('user_id', user_id)

                setAccessToken(res.data.access)
                cookies.set('access_token', res.data.access)
        
                setRefreshToken(res.data.refresh)
                cookies.set('refresh_token', res.data.refresh)

                axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + res.data.access;

                const userRes = await getUser()
                
                if(userRes.ok){
                    return true
                }
            }

        } catch (error) {
            return error
        }
    }

    async function register(formData){

        try {
            
            const res = await axiosInstance.post('users/register', {
                email: formData.email,
                username: formData.username,
                password: formData.password,
                password2: formData.password2,
            })
    
            if(res.status==200){
                return res
            }

        } catch (error) {
            console.log(error)
        }
    }

    async function getUser(){

        if(!id){
            return true
        }

        try {
            const {data} = await axiosInstance.get(`user/${id}`)

            setUser(data)

            return data

        } catch (error) {
            return error
        }
    }

    async function logout(){

        try {
            // const res = await axiosInstance.post(`user/logout/blacklist`,{refresh_token:refreshToken})
            cookies.remove('refresh_token')
            cookies.remove('access_token')
            cookies.remove('user_id')
            setId()
            setAccessToken()
            setRefreshToken()

            return true

        } catch (error) {

            return error
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
            setWishlist((prev)=>prev.filter(car=>{return item != car}))
        }
    }

    return <AuthContext.Provider value={{
        user,
        isAuth,
        accessToken,
        refreshToken,
        wishlist,
        id,
        clearWishlist,
        toggleCarToWishlist,
        register,
        login,
        logout,
        getUser,
    }}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext