import axios from "../axios";
import useAuth from "./useAuth";

const useLogout = () => {
    const { setUser, setAccessToken, setCSRFToken } = useAuth();

    const logout = async () => {
        try {
            const response = await axios.post('/auth/logout');
            setUser({});
            setAccessToken()
            setCSRFToken()
        } catch (err) {
            console.error(err);
        }
    }

    return logout;
}

export default useLogout