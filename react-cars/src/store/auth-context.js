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
    passwordChange:()=>{},
})

export function AuthContextProvider(props){

    const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'))
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refresh_token'))
    const [user, setUser] = useState()
    const [id, setId] = useState(localStorage.getItem('user_id'))
    const isAuth = accessToken&&id&&user

    const [wishlist, setWishlist] = useState([])

    async function login(formData){

        try {
            const res = await axiosInstance.post(`user/token`, {
				email: formData.email,
				password: formData.password,
			})
                
            const {user_id} = JSON.parse(atob(res.data.access.split('.')[1]));

            setId(user_id)
            localStorage.setItem('user_id', user_id)

            setAccessToken(res.data.access)
            localStorage.setItem('access_token', res.data.access)
    
            setRefreshToken(res.data.refresh)
            localStorage.setItem('refresh_token', res.data.refresh)

            axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + res.data.access;

        } catch (error) {
            return error
        }
    }

    async function register(formData){

        try {
            
            const res = await axiosInstance.post('user/register', {
                email: formData.email,
                username: formData.username,
                password: formData.password,
                password2: formData.password2,
                phone: formData.phone
            })
    
            if(await res.ok){
                return res
            }

        } catch (error) {
            return error
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
            const res = await axiosInstance.post(`user/logout/blacklist`,{refresh_token:refreshToken})
            localStorage.removeItem('refresh_token')
            localStorage.removeItem('access_token')
            localStorage.removeItem('user_id')
            setId()
            setAccessToken()
            setRefreshToken()

            return res

        } catch (error) {

            return error
        }
    }

    async function passwordChange(formData){

        try {
            
            const res = await axiosInstance.post('user/change-password', {
                old_password:formData.oldPassword, 
                new_password1:formData.newPassword1, 
                new_password2:formData.newPassword2
            })    
            return res

        } catch (error) {
            return error.response
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
        passwordChange,
    }}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext