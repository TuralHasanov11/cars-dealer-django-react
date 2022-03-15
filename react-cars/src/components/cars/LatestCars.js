import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';

function LatestCars({cars}){
    
    return (
        <div className="tns-carousel-wrapper tns-controls-outside-xxl tns-nav-outside tns-carousel-light">
            <div className="tns-carousel-inner" data-carousel-options="{&quot;items&quot;: 3, &quot;responsive&quot;: {&quot;0&quot;:{&quot;items&quot;:1, &quot;gutter&quot;: 16},&quot;500&quot;:{&quot;items&quot;:2, &quot;gutter&quot;: 18},&quot;900&quot;:{&quot;items&quot;:3, &quot;gutter&quot;: 20}, &quot;1100&quot;:{&quot;gutter&quot;: 24}}}">
            
               {cars.map((car, index)=>(
                <div key={index}>
                    <div className="card card-light card-hover h-100">
                        <div className="card-img-top card-img-hover"><Link className="img-overlay" to={`/cars/${car.id}`}></Link>
                        <div className="position-absolute start-0 top-0 pt-3 ps-3">
                            <span className={`d-table badge bg-${car.is_new?'danger':'info'}`}>{car.is_new?'New':'Used'}</span>
                        </div>
                        <div className="content-overlay end-0 top-0 pt-3 pe-3">
                            <button className="btn btn-icon btn-light btn-xs text-primary rounded-circle" type="button" data-bs-toggle="tooltip" data-bs-placement="left" title="Add to Wishlist"><i className="fi-heart"></i></button>
                        </div><img src="/assets/img/car-finder/catalog/08.jpg" alt="Image"/>
                        </div>
                        <div className="card-body">
                        <div className="d-flex align-items-center justify-content-between pb-1">
                            <span className="fs-sm text-light me-3">{car.made_at}</span>
                        </div>
                        <h3 className="h6 mb-1"><Link className="nav-link-light" to={`/cars/${car.id}`}>{car.car_model.brand.name} {car.car_model.name}</Link></h3>
                        <div className="text-primary fw-bold mb-1">{car.price} {car.currency.toUpperCase()}</div>
                        <div className="fs-sm text-light opacity-70"><i className="fi-map-pin me-1"></i>{car.city}</div>
                        </div>
                        <div className="card-footer border-0 pt-0">
                        <div className="border-top border-light pt-3">
                            <div className="row g-2">
                            <div className="col me-sm-1">
                                <div className="bg-dark rounded text-center w-100 h-100 p-2"><i className="fi-dashboard d-block h4 text-light mb-0 mx-center"></i><span className="fs-xs text-light">{car.distance}</span></div>
                            </div>
                            <div className="col me-sm-1">
                                <div className="bg-dark rounded text-center w-100 h-100 p-2"><i className="fi-gearbox d-block h4 text-light mb-0 mx-center"></i><span className="fs-xs text-light">{car.gear_lever}</span></div>
                            </div>
                            <div className="col">
                                <div className="bg-dark rounded text-center w-100 h-100 p-2"><i className="fi-petrol d-block h4 text-light mb-0 mx-center"></i><span className="fs-xs text-light">{car.fuel}</span></div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
               ))}

            </div>
        </div>
    )
}

export default LatestCars

LatestCars.defaultProps = {
    cars: [],
}
  
LatestCars.propTypes={
    cars: PropTypes.array.isRequired,
}