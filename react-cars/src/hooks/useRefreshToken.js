import axios from '../axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAccessToken } = useAuth();

    const refresh = async () => {
        const response = await axios.post('auth/token/refresh');
        setAccessToken(response.data.access)
        return response.data.access;
    }
    return refresh;
};

export default useRefreshToken;