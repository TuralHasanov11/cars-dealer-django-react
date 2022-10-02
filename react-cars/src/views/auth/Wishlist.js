import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import CarVerticalCard from "../../components/ui/cards/CarVertical";
import useAxiosPrivate from "../../hooks/useAxiosPrivate"

function Wishlist(){

    const {wishlist, setWishlist} = useContext(AuthContext)
    const axiosPrivate = useAxiosPrivate()

    async function clearWishlist(){
      try {
        await axiosPrivate.post(`/auth/wishlist/clear`)
        setWishlist([])
      } catch (error) {
        // TODO: error
      }
    } 

    return <>
      <div className="d-flex align-items-center justify-content-between mb-4 pb-2">
        <h1 className="h2 text-light mb-0">Wishlist<span className="badge bg-faded-light fs-base align-middle ms-3">{wishlist?.length}</span></h1>
        <div role='button' className="nav-link-light fw-bold" onClick={clearWishlist}><i className="fi-x fs-xs mt-n1 me-2"></i>Clear all</div>
      </div>
      <div className="row">
           {wishlist.map((car, index)=>( <div className="col-sm-6 mb-4" key={index}>
              <CarVerticalCard car={car}/>
          </div>))}
        </div>
    </>
}

export default Wishlist;
