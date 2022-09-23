import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../../store/auth-context";
import CarsContext from "../../../store/cars-context";

export default function CarHorizontalCard({car}){

  const {wishlist, toggleCarToWishlist, user: authUser} = useContext(AuthContext)
  const {deleteCar} = useContext(CarsContext)


  function deleteCarHandler(){
    if(car.user.id === authUser.id){
        deleteCar(car)
    }else{
        return
    }
  }

    return (<div className="card card-light card-hover card-horizontal mb-4">
    <div className="tns-carousel-wrapper card-img-top card-img-hover"><Link className="img-overlay" to={`/cars/${car?.id}`}></Link>
      <div className="position-absolute start-0 top-0 pt-3 ps-3">
        <span className={`d-table  my-1 badge bg-${car?.is_new?'danger':'info'}`}>{car?.is_new?'New':'Used'}</span>
        {car?.barter&&<span data-bs-toggle="tooltip" data-bs-placement="left" title="Barter" className={`d-table my-1 badge bg-success`}><i className="fi-refresh"></i></span>}
        {car?.credit&&<span data-bs-toggle="tooltip" data-bs-placement="left" title="Credit" className={`d-table my-1 badge bg-warning`}>%</span>}
      </div>
      <div className="content-overlay end-0 top-0 pt-3 pe-3">
        <button onClick={()=>{toggleCarToWishlist(car)}} className="btn btn-icon btn-light btn-xs text-primary rounded-circle" 
          type="button" data-bs-toggle="tooltip" data-bs-placement="left" 
          title={wishlist.includes(car)?"Add to Wishlist":"Remove from Wishlist"}
        >
          {wishlist.includes(car)?<i className="fi-heart"></i>:<i className="fi-heart"></i>}
        </button>
      </div>
      <div className="tns-carousel-inner position-absolute top-0 h-100">
        <div className="bg-size-cover bg-position-center w-100 h-100" style={{'backgroundImage':'url(/assets/img/car-finder/catalog/09.jpg)'}}></div>
        <div className="bg-size-cover bg-position-center w-100 h-100" style={{'backgroundImage':'url(/assets/img/car-finder/catalog/09.jpg)'}}></div>
      </div>
    </div>
    <div className="card-body position-relative">
      {car?.user.id === authUser.id&&(
          <div className="dropdown position-absolute zindex-5 top-0 end-0 mt-3 me-3">
              <button className="btn btn-icon btn-translucent-light btn-xs rounded-circle" type="button" id="contextMenu2" data-bs-toggle="dropdown" aria-expanded="false"><i className="fi-dots-vertical"></i></button>
              <ul className="dropdown-menu dropdown-menu-dark my-1" aria-labelledby="contextMenu2">
              <li>
                  <Link to={`/cars/${car.id}/edit`} className="dropdown-item"><i className="fi-edit me-2"></i>Edit</Link>
              </li>
              <li>
                  <button className="dropdown-item" type="button"><i className="fi-flame me-2"></i>Promote</button>
              </li>
              <li>
                  <button className="dropdown-item" type="button"><i className="fi-power me-2"></i>Deactivate</button>
              </li>
              <li>
                  <button onClick={deleteCarHandler} className="dropdown-item" type="button"><i className="fi-trash me-2"></i>Delete</button>
              </li>
              </ul>
          </div>
          )}
      <div className="d-flex align-items-center justify-content-between pb-1">
        <span className="fs-sm text-light me-3">{car?.made_at}</span>
      </div>
      <h3 className="h6 mb-1"><Link className="nav-link-light" to={`/cars/${car?.id}`}>{car?.car_model.brand.name + ' ' + car?.car_model.name}</Link></h3>
      <div className="text-primary fw-bold mb-1">{car?.price + ' ' + car?.currency}</div>
      <div className="fs-sm mb-2 text-light opacity-70"><i className="fi-map-pin me-1"></i>{car?.city}</div>
      <div className="fs-sm text-light opacity-70"><i className="fi-flame me-1"></i>{car?.engine} L</div>
      <div className="border-top border-light mt-3 pt-3">
        <div className="row g-2">
          <div className="col me-sm-1">
            <div className="bg-dark rounded text-center w-100 h-100 p-2"><i className="fi-dashboard d-block h4 text-light mb-0 mx-center"></i><span className="fs-xs text-light">{car?.distance} km</span></div>
          </div>
          <div className="col me-sm-1">
            <div className="bg-dark rounded text-center w-100 h-100 p-2"><i className="fi-gearbox d-block h4 text-light mb-0 mx-center"></i><span className="fs-xs text-light">{car?.gear_lever}</span></div>
          </div>
          <div className="col">
            <div className="bg-dark rounded text-center w-100 h-100 p-2"><i className="fi-petrol d-block h4 text-light mb-0 mx-center"></i><span className="fs-xs text-light">{car?.fuel}</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>)
}