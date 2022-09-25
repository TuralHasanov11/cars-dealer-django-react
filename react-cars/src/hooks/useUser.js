import useAuth from './useAuth';
import useAxiosPrivate from './useAxiosPrivate';

const useUser = () => {
    const { setUser, setWishlist, user } = useAuth();
    const axiosPrivate = useAxiosPrivate()

    const getUser = async () => {
      try {
        const {data} = await axiosPrivate.get(`auth/user`)
          setUser({...user, ...data})
          setWishlist(data.user_wishlist)
        } catch (error) {
          console.log(error.response)
        }
    }
    return getUser;
};

export default useUser;