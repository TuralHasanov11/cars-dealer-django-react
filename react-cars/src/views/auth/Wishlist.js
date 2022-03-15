import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import CarCard from '../../components/ui/cards/CarCard'

function Wishlist(){

    const authCtx = useContext(AuthContext)

    return <>
      <div className="d-flex align-items-center justify-content-between mb-4 pb-2">
        <h1 className="h2 text-light mb-0">Wishlist<span className="badge bg-faded-light fs-base align-middle ms-3">{authCtx.wishlist.length}</span></h1>
        <div role={'button'} className="nav-link-light fw-bold" onClick={authCtx.clearWishlist}><i className="fi-x fs-xs mt-n1 me-2"></i>Clear all</div>
      </div>
      {authCtx.wishlist.map((car, index)=>(
        <CarCard key={index} car={car}/>
      ))}
    </>
}

export default Wishlist;
