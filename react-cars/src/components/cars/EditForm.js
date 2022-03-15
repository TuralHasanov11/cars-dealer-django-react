import { useContext, useState } from "react";
import CarsContext from '../../store/cars-context'
import ItemsContext from "../../store/items-context";
import AuthContext from "../../store/auth-context";
import PropTypes from 'prop-types';

export default function EditForm(props){

    const carCtx = useContext(CarsContext)
    const itemsCtx = useContext(ItemsContext)
    const authCtx = useContext(AuthContext)


    const [brand, setBrand] = useState(props.car.car_model.brand.id)
    const [carModel, setCarModel] = useState(props.car.car_model.id)
    const [city, setCity] = useState(props.car.city.id)
    const [color, setColor] = useState(props.car.color.id)
    const [carBody, setCarBody] = useState(props.car.car_body.id)
    const [engine, setEngine] = useState(props.car.engine.id)
    const [gearLever, setGearLever] = useState(props.car.gear_lever.id)
    const [transmission, setTransmission] = useState(props.car.transmission.id)
    const [fuel, setFuel] = useState(props.car.fuel.id)
    const [equipment, setEquipment] = useState(props.car.equipment.map(el => el.id))
    const [distance, setDistance] = useState(props.car.distance)
    const [description, setDescription] = useState(props.car.description)
    const [madeAt, setMadeAt] = useState(props.car.made_at)
    const [barter, setBarter] = useState(props.car.barter)
    const [credit, setCredit] = useState(props.car.credit)
    const [price, setPrice] = useState(props.car.price)


    function onBrandChange(e){
        itemsCtx.getCarModels(e.target.value)
        setBrand(e.target.value)
    }

    function onCarModelChange(e){
        setCarModel(e.target.value)
    }

    function onCityChange(e){
        setCity(e.target.value)
    }

    function onColorChange(e){
        setColor(e.target.value)
    }

    function onCarBodyChange(e){
        setCarBody(e.target.value)
    }

    function onEngineChange(e){
        setEngine(e.target.value)
        
    }

    function onGearLeverChange(e){
        setGearLever(e.target.value)
    }

    function onTransmissionChange(e){
        setTransmission(e.target.value)
    }

    function onFuelChange(e){
        setFuel(e.target.value)
    }

    function onEquipmentItemToggle(e){
        let item = parseInt(e.target.value)
        setEquipment(prev=>{
            if(prev.includes(item)){
                return prev.filter(function(value, index){ 
                    return value != item;
                });
            }else{
                return prev.concat([item])
            }
        })
    }

    function onDescriptionChange(e){
        setDescription(e.target.value)
    }

    function onDistanceChange(e){
        setDistance(e.target.value)
    }

    function onPriceChange(e){
        setPrice(e.target.value)
    }

    function onYearChange(e){
        setMadeAt(e.target.value)
    }

    function formSubmit(event){
        
        event.preventDefault()

        console.log(props.car, {brand,car_model:carModel,city,color, car_body:carBody,
            engine,gear_lever:gearLever, transmission, fuel, equipment, price, 
            barter, credit, distance, description, madeAt
        })

        // carCtx.updateCar(car, {brand,car_model:carModel,city,color, car_body:carBody,
        //     engine,gear_lever:gearLever, transmission,fuel,equipment, price, 
        //     barter, credit, distance, description,madeAt
        // }).then(res=>{
        //     // props.setMessage({
        //     //     success:true,
        //     //     message:'Car shared!'
        //     // })
        // }).catch(e=>{
        //     // props.setMessage({
        //     //     success:false,
        //     //     message:'Car not shared!'
        //     // })
        // })
    }

    return <form onSubmit={formSubmit}>
        <section className="card card-light card-body border-0 shadow-sm p-4 mb-4" id="price">
            <h2 className="h4 text-light mb-4"><i className="fi-cash text-primary fs-5 mt-n1 me-2"></i>Price</h2>
            <label className="form-label text-light" htmlFor="price">Price <span className="text-danger">*</span></label>
            <div className="d-sm-flex mb-2">
                <select className="form-select form-select-light w-25 me-2 mb-2">
                    <option value="usd">&#36;</option>
                    <option value="eur">&#8364;</option>
                    <option value="azn">&#8380;</option>
                </select>
                <input value={price} onChange={onPriceChange} className="form-control form-control-light w-100 me-2 mb-2" type="number" id="price" min="200" step="50"/>
            </div>
            <div className="form-check form-switch form-switch-light">
                <input className="form-check-input" type="checkbox" value={barter} checked={barter} onChange={()=>setBarter(prev=>!prev)} id="barter"/>
                <label className="form-check-label" htmlFor="barter">Barter</label>
            </div>
            <div className="form-check form-switch form-switch-light">
                <input className="form-check-input" type="checkbox" value={credit} checked={credit} onChange={()=>setCredit(prev=>!prev)} id="credit"/>
                <label className="form-check-label" htmlFor="credit">Credit</label>
            </div>
        </section>


        <section className="card card-light card-body border-0 shadow-sm p-4 mb-4" id="vehicle-info">
            <h2 className="h4 text-light mb-4"><i className="fi-car text-primary fs-5 mt-n1 me-2"></i>Vehicle information</h2>
            <div className="row pb-2">
                <div className="col-sm-6 mb-3">
                    <label className="form-label text-light" htmlFor="brand">Make <span className="text-danger">*</span></label>
                    <select className="form-select form-select-light" id="brand" defaultValue={brand} onChange={onBrandChange}>
                        <option value="">Select make</option>
                        {props.brands.map((brand, index)=>(<option key={index} value={brand.id}>{brand.name}</option>))}
                    </select>
                </div>
                <div className="col-sm-6 mb-3">
                    <label className="form-label text-light" htmlFor="car_model">Model <span className="text-danger">*</span></label>
                    <select className="form-select form-select-light" id="car_model" defaultValue={carModel} onChange={onCarModelChange}>
                        <option value="" disabled={props.carModels.length==0}>Select model</option>
                        {props.carModels.map((model, index)=>(<option key={index} value={model.id}>{model.name}</option>))}
                    </select>
                </div>
                <div className="col-md-3 col-sm-6 mb-3">
                    <label className="form-label text-light" htmlFor="made_at">Year <span className="text-danger">*</span></label>
                    <select onChange={onYearChange} defaultValue={madeAt} className="form-select form-select-light" id="made_at">
                        <option value="">Select year</option>
                        {props.years.map((year, index)=>(<option key={index} value={year}>{year}</option>))}
                    </select>
                </div>
                <div className="col-md-3 col-sm-6 mb-3">
                    <label className="form-label text-light" htmlFor="distance">Distance <span className="text-danger">*</span></label>
                    <input onChange={onDistanceChange} className="form-control form-control-light" type="number" id="distance" min="0" value={distance}/>
                </div>
            </div>
            <div className="border-top border-light mt-2 pt-4">
                <div className="row pb-2">
                <div className="col-md-6">
                    <label className="form-label text-light" htmlFor="car_body">Body type <span className="text-danger">*</span></label>
                    <select onChange={onCarBodyChange} defaultValue={carBody} className="form-select form-select-light mb-3" id="car_body">
                        <option value="">Select body type</option>
                        {props.carBodies.map((body, index)=>(<option key={index} value={body.id}>{body.name}</option>))}
                    </select>

                    <label className="form-label text-light" htmlFor="fuel">Fuel type <span className="text-danger">*</span></label>
                    <select onChange={onFuelChange} defaultValue={fuel} className="form-select form-select-light mb-3" id="fuel">
                        <option value="">Select fuel type</option>
                        {props.fuels.map((fuel, index)=>(<option key={index} value={fuel.id}>{fuel.name}</option>))}
                    </select>

                    <label className="form-label text-light" htmlFor="engine">Engine <span className="text-danger">*</span></label>
                    <select onChange={onEngineChange} defaultValue={engine} className="form-select form-select-light mb-3" id="engine">
                        <option value="">Select engine</option>
                        {props.engines.map((engine, index)=>(<option key={index} value={engine.id}>{engine.volume}</option>))}
                    </select>

                    <label className="form-label text-light" htmlFor="transmission">Transmission <span className="text-danger">*</span></label>
                    <select onChange={onTransmissionChange} defaultValue={transmission} className="form-select form-select-light mb-3" id="transmission">
                        <option value="">Select transmission</option>
                        {props.transmissions.map((transmission, index)=>(<option key={index} value={transmission.id}>{transmission.name}</option>))}
                    </select>

                    <label className="form-label text-light" htmlFor="gear_lever">Gear lever <span className="text-danger">*</span></label>
                    <select onChange={onGearLeverChange} defaultValue={gearLever} className="form-select form-select-light mb-3" id="gear_lever">
                        <option value="">Select gear lever</option>
                        {props.gearLevers.map((lever, index)=>(<option key={index} value={lever.id}>{lever.name}</option>))}
                    </select>

                    <label className="form-label text-light" htmlFor="color">Color <span className="text-danger">*</span></label>
                    <select onChange={onColorChange} defaultValue={color} className="form-select form-select-light mb-3" id="color">
                        <option value="">Select color</option>
                        {props.colors.map((color, index)=>(<option key={index} value={color.id}>{color.name}</option>))}
                    </select>
                </div>
                </div>
            </div>
            <div className="border-top border-light mt-2 pt-4">
                <label className="form-label text-light" htmlFor="description">Description </label>
                <textarea onChange={onDescriptionChange} defaultValue={description} className="form-control form-control-light" id="description" rows="5" placeholder="Describe your vehicle"></textarea>
                <span className="form-text text-light opacity-50">{description.length>0?3000-description.length:3000} characters left</span>
            </div>
        </section>

        <section className="card card-light card-body border-0 shadow-sm p-4 mb-4" id="features">
            <h2 className="h4 text-light mb-4"><i className="fi-check-circle text-primary fs-5 mt-n1 me-2"></i>Features</h2>
            <div className="mb-4">
                <div className="row">
                {props.equipment.map((item,index)=>(
                    <div key={index} className="col-sm-4">
                        <div className="form-check form-check-light">
                            <input className="form-check-input" type="checkbox" checked={equipment.includes(item.id)} value={item.id} onChange={onEquipmentItemToggle} id={`item-${item.id}`}/>
                            <label className="form-check-label" htmlFor={`item-${item.id}`}>{item.name}</label>
                        </div>
                    </div>
                ))}
                </div>
            </div>
           
        </section>

        <section className="card card-light card-body shadow-sm p-4 mb-4" id="photos">
            <h2 className="h4 text-light mb-4"><i className="fi-image text-primary fs-5 mt-n1 me-2"></i>Photos / video</h2>
            <div className="alert alert-warning bg-faded-warning border-warning mb-4" role="alert">
                <div className="d-flex"><i className="fi-alert-circle me-2 me-sm-3"></i>
                <p className="fs-sm mb-1">The maximum photo size is 8 MB. Formats: jpeg, jpg, png. Put the main picture first.<br/>The maximum video size is 10 MB. Formats: mp4, mov.</p>
                </div>
            </div>
            {/* <input className="file-uploader file-uploader-grid bg-faded-light border-light" type="file" multiple data-max-file-size="10MB" accept="image/png, image/jpeg, video/mp4, video/mov" data-label-idle="&lt;div className=&quot;btn btn-primary mb-3&quot;&gt;&lt;i className=&quot;fi-cloud-upload me-1&quot;&gt;&lt;/i&gt;Upload photos / video&lt;/div&gt;&lt;div className=&quot;text-light opacity-70&quot;&gt;or drag them in&lt;/div&gt;"/> */}
        </section>

        <section className="card card-light card-body border-0 shadow-sm p-4 mb-4" id="location">
            <h2 className="h4 text-light mb-4"><i className="fi-map-pin text-primary fs-5 mt-n1 me-2"></i>Location</h2>
            <div className="row">
                <div className="col-sm-8 mb-3">
                <label className="form-label text-light" htmlFor="city">City <span className="text-danger">*</span></label>
                <select onChange={onCityChange} defaultValue={city} className="form-select form-select-light" id="city" required>
                    <option value="">Choose city</option>
                    {props.cities.map((city, index)=>(<option key={index} value={city.id}>{city.name}</option>))}
                </select>
                </div>
            </div>
        </section>

        {/* <section className="card card-light card-body border-0 shadow-sm p-4 mb-4" id="contacts">
            <h2 className="h4 text-light mb-4"><i className="fi-phone text-primary fs-5 mt-n1 me-2"></i>Contacts</h2>
            <div className="row">
                <div className="col-sm-6 mb-3">
                    <label className="form-label text-light" htmlFor="username">Username <span className="text-danger">*</span></label>
                    <input className="form-control form-control-light" type="text" id="username" value={authCtx.user.username} placeholder="Enter your first name" required/>
                </div>
                <div className="col-sm-6 mb-3">
                    <label className="form-label text-light" htmlFor="phone">Phone number <span className="text-danger">*</span></label>
                    <input className="form-control form-control-light" type="tel" id="phone" data-format="custom" data-delimiter="-" data-blocks="3 3 4" value={authCtx.user.phone} placeholder="000-000-0000"/>
                </div>
            </div>
        </section> */}

        <div className="d-sm-flex justify-content-between pt-2">
            <button type="submit" className="btn btn-primary btn-lg d-block mb-2">Save</button>
        </div>
    </form>
}



EditForm.defaultProps = {
    car:{},
    brands:[],
    carModels:[],
    cities:[],
    colors:[],
    carBodies:[],
    engines:[],
    equipment:[],
    gearLevers:[],
    transmissions:[],
    fuels:[],
    years:[],
}
  
EditForm.propTypes={
    car:PropTypes.object.isRequired,
    brands:PropTypes.array.isRequired,
    carModels:PropTypes.array.isRequired,
    cities:PropTypes.array.isRequired,
    colors:PropTypes.array.isRequired,
    carBodies:PropTypes.array.isRequired,
    engines:PropTypes.array.isRequired,
    equipment:PropTypes.array.isRequired,
    gearLevers:PropTypes.array.isRequired,
    transmissions:PropTypes.array.isRequired,
    fuels:PropTypes.array.isRequired,
    years:PropTypes.array.isRequired,
}