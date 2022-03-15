import { Link } from "react-router-dom";
import PropTypes from 'prop-types';


export default function Car({car, deleteCar}){

    function deleteCar(){
        
    }


    return <>
        <div className="d-sm-flex align-items-end align-items-md-center justify-content-between position-relative mb-4" style={{'zIndex': '102'}}>
            <div className="me-3">
                <h1 className="h2 text-light mb-md-0">{car.car_model.brand.name + ' ' + car.car_model.name}</h1>
                <div className="d-md-none">
                    <div className="d-flex align-items-center mb-3">
                        <div className="h3 mb-0 text-light">{car.price + ' ' + car.currency} {car.barter?'Barter':''} {car.credit?'Credit':''}</div>
                        <div className="text-nowrap ps-3">
                            <span className={`badge bg-${car.is_new?'danger':'info'} fs-base me-2`}>{car.is_new?'New':'Used'}</span>
                        </div>
                    </div>
                    <div className="d-flex flex-wrap align-items-center text-light mb-2">
                        <div className="text-nowrap border-end border-light pe-3 me-3"><i className="fi-dashboard fs-lg opacity-70 me-2"></i><span className="align-middle">{car.distance} km</span></div>
                        <div className="text-nowrap"><i className="fi-map-pin fs-lg opacity-70 me-2"></i><span className="align-middle">{car.city.name}</span></div>
                    </div>
                </div>
            </div>
            <div className="text-nowrap pt-3 pt-sm-0">
                <button className="btn btn-icon btn-translucent-light btn-xs rounded-circle mb-sm-2" type="button" data-bs-toggle="tooltip" title="Add to Wishlist"><i className="fi-heart"></i></button>
                <Link to={`/cars/${car.id}/edit`} className="btn btn-info btn-sm ms-2 order-lg-3" data-bs-toggle="tooltip" title="Edit car"><i className="fi-edit me-2"></i>Edit</Link>
                <button onClick={deleteCar} className="btn btn-danger btn-sm ms-2 order-lg-3" type="button" data-bs-toggle="tooltip" title="Delete car"><i className="fi-trash me-2"></i>Delete</button>
            </div>
        </div>
        
         <div className="row">
            <div className="col-md-7">
                <div className="tns-carousel-wrapper">
                    <div className="tns-slides-count text-light"><i className="fi-image fs-lg me-2"></i>
                        <div className="ps-1"><span className="tns-current-slide fs-5 fw-bold"></span><span className="fs-5 fw-bold">/</span><span className="tns-total-slides fs-5 fw-bold"></span></div>
                    </div>
                    <div className="tns-carousel-inner" data-carousel-options="{&quot;navAsThumbnails&quot;: true, &quot;navContainer&quot;: &quot;#thumbnails&quot;, &quot;gutter&quot;: 12, &quot;responsive&quot;: {&quot;0&quot;:{&quot;controls&quot;: false},&quot;500&quot;:{&quot;controls&quot;: true}}}">
                        <div><img className="rounded-3" src="/assets/img/car-finder/single/gallery/01.jpg" alt="Image"/></div>
                        <div><img className="rounded-3" src="/assets/img/car-finder/single/gallery/02.jpg" alt="Image"/></div>
                        <div><img className="rounded-3" src="/assets/img/car-finder/single/gallery/03.jpg" alt="Image"/></div>
                        <div><img className="rounded-3" src="/assets/img/car-finder/single/gallery/04.jpg" alt="Image"/></div>
                        <div><img className="rounded-3" src="/assets/img/car-finder/single/gallery/05.jpg" alt="Image"/></div>
                        <div><img className="rounded-3" src="/assets/img/car-finder/single/gallery/06.jpg" alt="Image"/></div>
                        <div><img className="rounded-3" src="/assets/img/car-finder/single/gallery/07.jpg" alt="Image"/></div>
                        <div><img className="rounded-3" src="/assets/img/car-finder/single/gallery/08.jpg" alt="Image"/></div>
                    </div>
                </div>
                <ul className="tns-thumbnails" id="thumbnails">
                    <li className="tns-thumbnail"><img src="/assets/img/car-finder/single/gallery/th01.jpg" alt="Thumbnail"/></li>
                    <li className="tns-thumbnail"><img src="/assets/img/car-finder/single/gallery/th02.jpg" alt="Thumbnail"/></li>
                    <li className="tns-thumbnail"><img src="/assets/img/car-finder/single/gallery/th03.jpg" alt="Thumbnail"/></li>
                    <li className="tns-thumbnail"><img src="/assets/img/car-finder/single/gallery/th04.jpg" alt="Thumbnail"/></li>
                    <li className="tns-thumbnail"><img src="/assets/img/car-finder/single/gallery/th05.jpg" alt="Thumbnail"/></li>
                    <li className="tns-thumbnail"><img src="/assets/img/car-finder/single/gallery/th06.jpg" alt="Thumbnail"/></li>
                    <li className="tns-thumbnail"><img src="/assets/img/car-finder/single/gallery/th07.jpg" alt="Thumbnail"/></li>
                    <li className="tns-thumbnail"><img src="/assets/img/car-finder/single/gallery/th08.jpg" alt="Thumbnail"/></li>
                </ul>
                <div className="py-3 mb-3">
                    <h2 className="h4 text-light mb-4">Specifications</h2>
                    <div className="row text-light">
                        <div className="col-sm-6 col-md-12 col-lg-6">
                        <ul className="list-unstyled">
                            <li className="mb-2"><strong>Manufacturing Year:</strong><span className="opacity-70 ms-1">{car.made_at}</span></li>
                            <li className="mb-2"><strong>Mileage:</strong><span className="opacity-70 ms-1">{car.distance} km</span></li>
                            <li className="mb-2"><strong>Body Type:</strong><span className="opacity-70 ms-1">{car.car_body.name}</span></li>
                            <li className="mb-2"><strong>Gear lever:</strong><span className="opacity-70 ms-1">{car.gear_lever.name}</span></li>
                            <li className="mb-2"><strong>Engine:</strong><span className="opacity-70 ms-1">{car.engine.volume}</span></li>
                            <li className="mb-2"><strong>Transmission:</strong><span className="opacity-70 ms-1">{car.transmission.name}</span></li>
                        </ul>
                        </div>
                        <div className="col-sm-6 col-md-12 col-lg-6">
                        <ul className="list-unstyled">
                            <li className="mb-2"><strong>Fuel Type:</strong><span className="opacity-70 ms-1">{car.fuel.name}</span></li>
                            <li className="mb-2"><strong>Color:</strong><span className="opacity-70 ms-1">{car.color.name}</span></li>
                            <li className="mb-2"><strong>Yeni:</strong><span className="opacity-70 ms-1">{car.is_new?'Yes':'No'}</span></li>
                        </ul>
                        </div>
                    </div>
                </div>

                <div className="card card-body p-4 card-light mb-4">
                    <h2 className="h4 text-light pt-3 mb-4">Equipment</h2>
                    <ul>
                        {car.equipment.map((item, index)=><li key={index}>{item.name}</li>)}
                    </ul>
                </div>

                
                <div className="pb-4 mb-3">
                    <h2 className="h4 text-light pt-4 mt-3">Description</h2>
                    <p className="text-light opacity-70 mb-1">{car.description}</p>
                    <div className="collapse" id="seeMoreDescription">
                        <p className="text-light opacity-70 mb-1">{car.description}</p>
                    </div>
                    <a className="collapse-label collapsed" href="#seeMoreDescription" data-bs-toggle="collapse" data-bs-label-collapsed="Show more" data-bs-label-expanded="Show less" role="button" aria-expanded="false" aria-controls="seeMoreDescription"></a>
                </div>
                <div className="d-flex flex-wrap border-top border-light fs-sm text-light pt-4 pb-5 pb-md-2">
                <div className="border-end border-light pe-3 me-3"><span className="opacity-70">Published: <strong>{car.created_at}</strong></span></div>
                <div className="border-end border-light pe-3 me-3"><span className="opacity-70">Ad number: <strong>{car.id}</strong></span></div>
                <div className="opacity-70">Views: <strong>57</strong></div>
                </div>
            </div>

            <div className="col-md-5 pt-5 pt-md-0" style={{'marginTop': '-6rem'}}>
                <div className="sticky-top pt-5">
                    <div className="d-none d-md-block pt-5">
                        <div className="d-flex mb-4">
                            <span className="badge bg-info fs-base"></span>
                        </div>
                        <div className="h3 text-light">{car.price + ' ' + car.currency}</div>
                        <div className="d-flex align-items-center text-light pb-4 mb-2">
                            <div className="text-nowrap border-end border-light pe-3 me-3"><i className="fi-dashboard fs-lg opacity-70 me-2"></i><span className="align-middle">{car.distance} km</span></div>
                            <div className="text-nowrap"><i className="fi-map-pin fs-lg opacity-70 me-2"></i><span className="align-middle">{car.city.name}</span></div>
                        </div>
                        <div className="card card-light card-body mb-4">
                            <div className="text-light mb-2">Private Seller</div>
                            <Link className="d-flex align-items-center text-decoration-none mb-3" to={`/user/${car.user.id}/cars`}>
                                <div className="ps-2">
                                    <h5 className="text-light mb-0">{car.user.username}</h5>
                                </div>
                            </Link>
                            <Link className="text-light" to={`/user/${car.user.id}/cars`}>Other ads by this seller</Link>
                            <div className="pt-4 mt-2">
                                <button className="btn btn-outline-light btn-lg px-4 mb-3" type="button"><i className="fi-phone me-2"></i>{car.user.profile_user?.phone}</button>
                                <br/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </>
}

Car.defaultProps = {
    car: {},
}
  
Car.propTypes={
    car: PropTypes.object.isRequired,
}
  