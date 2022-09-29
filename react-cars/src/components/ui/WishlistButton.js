import React, { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import useAxiosPrivate from "../../hooks/useAxiosPrivate"

export default function WishlistButton({car}) {

  const {wishlist, setWishlist, wishlistIds} = useContext(AuthContext)
  const axiosPrivate = useAxiosPrivate()

  async function toggleCarToWishlist(carId){
    if(wishlistIds.includes(carId)){
      try {
        await axiosPrivate.post(`/auth/wishlist/${carId}/remove`)
        setWishlist((prev)=>prev.filter(item => item.id !== carId))
      } catch (error) {
        
      }
    }else{
      try {
        await axiosPrivate.post(`/auth/wishlist/${carId}/add`) 
        setWishlist(prev=>[...prev, car])
      } catch (error) {
        
      }
    }
  }


  return (wishlist&&<button onClick={()=>{toggleCarToWishlist(car.id)}} className="btn btn-icon btn-light btn-xs text-primary rounded-circle" 
    type="button" data-bs-toggle="tooltip" data-bs-placement="left" 
    title={wishlistIds?.includes(car.id)?"Add to Wishlist":"Remove from Wishlist"}
  >
    {wishlistIds?.includes(car.id)?<i className="fi-heart-filled"></i>:<i className="fi-heart"></i>}
  </button>);
}
