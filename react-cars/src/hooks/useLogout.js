import axios from "../axios";
import useAuth from "./useAuth";

const useLogout = () => {
    const { setUser, setAccessToken } = useAuth();

    const logout = async () => {
        try {
            const response = await axios('/auth/logout/blacklist');
            setUser({});
            setAccessToken()
        } catch (err) {
            console.error(err);
        }
    }

    return logout;
}

export default useLogout