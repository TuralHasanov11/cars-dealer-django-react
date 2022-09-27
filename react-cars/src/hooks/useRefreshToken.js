import axios from '../axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAccessToken, setCSRFToken } = useAuth();

    const refresh = async () => {
        const response = await axios.post('auth/token/refresh');
        setAccessToken(response.data.access)
        setCSRFToken(response.headers["x-csrftoken"])
        return {accessToken: response.data.access, csrfToken: response.headers["x-csrftoken"]};
    }
    return refresh;
};

export default useRefreshToken;