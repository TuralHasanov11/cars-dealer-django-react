import React, { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import useAxiosPrivate from "../../hooks/useAxiosPrivate"

export default function WishlistButton({car}) {

  const {wishlist, setWishlist} = useContext(AuthContext)
  const axiosPrivate = useAxiosPrivate()

  async function toggleCarToWishlist(car){
    if(wishlist.includes(car)){
      try {
        await axiosPrivate.post(`/auth/wishlist/${car.id}/add`)
        setWishlist((prev)=>prev.filter(item => item !== car))
      } catch (error) {
        return
      }
    }else{
      try {
        await axiosPrivate.post(`/auth/wishlist/${car.id}/remove`) 
        wishlist.push(car)
      } catch (error) {
        return
      }
    }
  }


  return (wishlist&&<button onClick={toggleCarToWishlist} className="btn btn-icon btn-light btn-xs text-primary rounded-circle" 
    type="button" data-bs-toggle="tooltip" data-bs-placement="left" 
    title={wishlist?.includes(car)?"Add to Wishlist":"Remove from Wishlist"}
  >
    {wishlist?.includes(car)?<i className="fi-heart-fill"></i>:<i className="fi-heart"></i>}
  </button>);
}
