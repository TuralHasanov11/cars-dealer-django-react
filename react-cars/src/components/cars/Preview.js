import React, { useContext } from 'react';
import CarsContext from '../../store/cars-context';
import ItemsContext from '../../store/items-context';

export default function Preview() {
  const {carPreview: car} = useContext(CarsContext)
  console.log(car)
  const { brands, carModels, cities, colors, carBodies, engines, equipment, gearLevers, transmissions, fuels } = useContext(ItemsContext)

  return (car&&<>
    <div className="d-sm-flex align-items-end align-items-md-center justify-content-between position-relative mb-4" style={{'zIndex': '102'}}>
        <div className="me-3">
            <h1 className="h2 text-light mb-md-0">
              {brands?.find(el => el.id === carModels?.find(el => el.id === car.car_model).id)?.name + ' ' + carModels?.find(el => el.id === car.car_model).name}
            </h1>
            <div className="d-flex align-items-center mb-3">
                <div className="h3 mb-0 text-light">{car.price + ' ' + car.currency} {car.barter&&'Barter'} {car.credit&&'Credit'}</div>
                <div className="text-nowrap ps-3">
                    <span className={`badge bg-${car.distance===0?'danger':'info'} fs-base me-2`}>{car.distance===0?'New':'Used'}</span>
                </div>
            </div>
            <div className="d-flex flex-wrap align-items-center text-light mb-2">
                <div className="text-nowrap border-end border-light pe-3 me-3">
                  <i className="fi-dashboard fs-lg opacity-70 me-2"></i>
                  <span className="align-middle">{car.distance} km</span>
                </div>
                <div className="text-nowrap">
                  <i className="fi-map-pin fs-lg opacity-70 me-2"></i>
                  <span className="align-middle">{cities?.find(el => el.id === car.city)?.name}</span>
                </div>
            </div>
        </div>
    </div>
        
    <div className="row">
      <div className="col-12">
          <ul className="tns-thumbnails" id="thumbnails">
              <li className="tns-thumbnail"><img src={car?.front_image?.image} alt={car?.front_image}/></li>
              <li className="tns-thumbnail"><img src={car?.back_image?.image} alt={car?.back_image}/></li>
              <li className="tns-thumbnail"><img src={car?.panel_image?.image} alt={car?.panel_image}/></li>
              {car?.other_images?.map((image, index) => (
                  <li key={index} className="tns-thumbnail"><img src={image.image} alt="Thumbnail"/></li>
              ))}
          </ul>
          <div className="py-3 mb-3">
              <h2 className="h4 text-light mb-4">Specifications</h2>
              <div className="row text-light">
                  <div className="col-sm-6 col-md-12 col-lg-6">
                  <ul className="list-unstyled">
                      <li className="mb-2"><strong>Manufacturing Year:</strong><span className="opacity-70 ms-1">{car.made_at}</span></li>
                      <li className="mb-2"><strong>Mileage:</strong><span className="opacity-70 ms-1">{car.distance} km</span></li>
                      <li className="mb-2"><strong>Body Type:</strong><span className="opacity-70 ms-1">{carBodies.find(el => el.id === car.car_body).name}</span></li>
                      <li className="mb-2"><strong>Gear lever:</strong><span className="opacity-70 ms-1">{gearLevers.find(el => el.id === car.gear_lever).name}</span></li>
                      <li className="mb-2"><strong>Engine:</strong><span className="opacity-70 ms-1">{engines.find(el => el.id === car.engine).volume}</span></li>
                      <li className="mb-2"><strong>Transmission:</strong><span className="opacity-70 ms-1">{transmissions.find(el => el.id === car.transmission).name}</span></li>
                  </ul>
                  </div>
                  <div className="col-sm-6 col-md-12 col-lg-6">
                  <ul className="list-unstyled">
                      <li className="mb-2"><strong>Fuel Type:</strong><span className="opacity-70 ms-1">{fuels?.find(el => el.id === car.fuel).name}</span></li>
                      <li className="mb-2"><strong>Color:</strong><span className="opacity-70 ms-1">{colors?.find(el => el.id === car.color).name}</span></li>
                  </ul>
                  </div>
              </div>
          </div>

          <div className="card card-body p-4 card-light mb-4">
              <h2 className="h4 text-light pt-3 mb-4">Equipment</h2>
              <ul>
                  {equipment.filter(el=> car.equipment.includes(el.id)).map((item, index)=><li key={index}>{item.name}</li>)}
              </ul>
          </div>
          
          <div className="pb-4 mb-3">
              <h2 className="h4 text-light pt-4 mt-3">Description</h2>
              <p className="text-light opacity-70 mb-1">{car?.description}</p>
          </div>
      </div>    
    </div>
  </>);
}
