import { axiosPrivate } from "../axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { accessToken, setAccessToken, user, csrfToken } = useAuth();

    useEffect(() => {

        axiosPrivate.defaults.withCredentials = true
        
        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config) => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${accessToken}`;
                    config.headers['X-CSRFToken'] = csrfToken
                }
                return config;
            }, (error) => Promise.reject(error)
        );
          
        const responseIntercept = axiosPrivate.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error?.config;
                if ((error?.response?.status === 403 || error?.response?.status === 401) && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const {csrfToken: newCSRFToken, accessToken: newAccessToken} = await refresh();
                    setAccessToken(newAccessToken)
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    prevRequest.headers['X-CSRFToken'] = newCSRFToken
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [accessToken, user])

    return axiosPrivate;
}

export default useAxiosPrivate;