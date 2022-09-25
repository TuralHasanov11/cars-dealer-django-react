import useAuth from './useAuth';
import useAxiosPrivate from './useAxiosPrivate';

const useUser = () => {
    const { setUser, setWishlist, user } = useAuth();
    const axiosPrivate = useAxiosPrivate()

    const getUser = async () => {
      try {
          await Promise.all([
            await axiosPrivate.get(`auth/user`),
            await axiosPrivate.get(`auth/wishlist`)
          ]).then(res => {
            setUser({...user, ...res[0].data})
            setWishlist(res[1].data)
          })
        } catch (error) {
          console.log(error.response)
        }
    }
    return getUser;
};

export default useUser;