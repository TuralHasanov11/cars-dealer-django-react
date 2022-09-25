import { useContext, useRef, useState } from "react";
import ItemsContext from "../../store/items-context";
import PropTypes from 'prop-types';
import { useInput } from "../../hooks/use-input";
import { validations } from "../../hooks/use-validation";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export default function EditForm(props){

    const itemsCtx = useContext(ItemsContext)
    const [loading, setLoading] = useState(false)
    const axiosPrivate = useAxiosPrivate()


    const {
        value: brand, 
        isValid: brandIsValid,
        hasError:brandHasError, 
        valueChange: onBrandChange, 
        messages:brandMessages,
    } = useInput({validations:validations, initialState: props.car.car_model.brand.id ,rules:{required:true,}})

    const {
        value: carModel, 
        isValid: carModelIsValid,
        hasError:carModelHasError, 
        valueChange: onCarModelChange, 
        messages:carModelMessages,
    } = useInput({validations:validations, initialState:props.car.car_model.id,rules:{required:true,}})

    const {
        value: city, 
        isValid: cityIsValid,
        hasError:cityHasError, 
        valueChange: onCityChange, 
        messages:cityMessages,
    } = useInput({validations:validations, initialState:props.car.city.id,rules:{required:true,}})

    const {
        value: color, 
        isValid: colorIsValid,
        hasError:colorHasError, 
        valueChange: onColorChange, 
        messages:colorMessages,
    } = useInput({validations:validations, initialState:props.car.color.id,rules:{required:true,}})

    const {
        value: carBody, 
        isValid: carBodyIsValid,
        hasError:carBodyHasError, 
        valueChange: onCarBodyChange, 
        messages:carBodyMessages,
    } = useInput({validations:validations, initialState:props.car.car_body.id,rules:{required:true,}})

    const {
        value: engine, 
        isValid: engineIsValid,
        hasError:engineHasError, 
        valueChange: onEngineChange, 
        messages:engineMessages,
    } = useInput({validations:validations, initialState:props.car.engine.id,rules:{required:true,}})

    const {
        value: gearLever, 
        isValid: gearLeverIsValid,
        hasError:gearLeverHasError, 
        valueChange: onGearLeverChange, 
        messages:gearLeverMessages,
    } = useInput({validations:validations, initialState:props.car.gear_lever.id,rules:{required:true,}})

    const {
        value: transmission, 
        isValid: transmissionIsValid,
        hasError:transmissionHasError, 
        valueChange: onTransmissionChange, 
        messages:transmissionMessages,
    } = useInput({validations:validations, initialState:props.car.transmission.id,rules:{required:true,}})

    const {
        value: fuel, 
        isValid: fuelIsValid,
        hasError:fuelHasError, 
        valueChange: onFuelChange, 
        messages:fuelMessages,
    } = useInput({validations:validations, initialState:props.car.fuel.id,rules:{required:true,}})

    const {
        value: distance, 
        isValid: distanceIsValid,
        hasError:distanceHasError, 
        valueChange: onDistanceChange, 
        valueBlur: onDistanceBlur,
        messages:distanceMessages,
    } = useInput({validations:validations, initialState:props.car.distance??0,  rules:{nullable:true,isInteger:true,between:[0,100000000]}})

    const {
        value: madeAt, 
        isValid: madeAtIsValid,
        hasError:madeAtHasError, 
        valueChange: onMadeAtChange, 
        messages:madeAtMessages,
    } = useInput({validations:validations, initialState:props.car.made_at, rules:{required:true,isInteger:true,min:1980, max:new Date().getFullYear()}})

    const {
        value: price, 
        isValid: priceIsValid,
        hasError:priceHasError, 
        valueChange: onPriceChange, 
        valueBlur: onPriceBlur,
        messages:priceMessages,
    } = useInput({validations:validations, initialState:props.car.price, rules:{required:true,isInteger:true,min:200}})

    const {
        value: description, 
        isValid: descriptionIsValid,
        hasError:descriptionHasError, 
        valueChange: onDescriptionChange, 
        valueBlur: onDescriptionBlur,
        messages:descriptionMessages,
    } = useInput({validations:validations, initialState:props.car.description, rules:{nullable:true}})

    const [barter, setBarter] = useState(props.car.barter)
    const [credit, setCredit] = useState(props.car.credit)


    const [equipment, setEquipment] = useState(props.car.equipment.map(el => el.id))

    const carImageFront = useRef()
    const carImageBack = useRef()
    const carImagePanel = useRef()
    const carImageOther = useRef()

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
    
    function handleBrandChange(e){
        onBrandChange(e)
        itemsCtx.getCarModels(e.target.value)
    }

    
    let formIsValid = (brandIsValid && carModelIsValid && cityIsValid && colorIsValid && carBodyIsValid && engineIsValid &&  gearLeverIsValid && 
        transmissionIsValid && fuelIsValid && distanceIsValid && madeAtIsValid && priceIsValid && descriptionIsValid)


    async function formSubmit(event){
        event.preventDefault()
        setLoading(true)

        if(!formIsValid){
            return
        }
        
        const formData = new FormData();
        formData.append("brand", brand);
        formData.append("car_model", carModel)
        formData.append("city", city)
        formData.append("color", color)
        formData.append("car_body", carBody)
        formData.append("engine", engine)
        formData.append("gear_lever", gearLever)
        formData.append("transmission", transmission)
        formData.append("fuel", fuel)
        formData.append("equipment", equipment.map(el=>parseInt(el)))
        formData.append("price", price)
        formData.append("barter", barter)
        formData.append("credit", credit)
        formData.append("distance", distance)
        formData.append("description", description)
        formData.append("made_at", madeAt)
        formData.append("front_image", carImageFront.current.files[0]) 
        formData.append("back_image", carImageBack.current.files[0])
        formData.append("panel_image", carImagePanel.current.files[0])
        formData.append("other_images", ...Array.prototype.slice.call(carImageOther.current.files))

        try {
            axiosPrivate.defaults.headers.common['Content-Type'] = 'multipart/form-data';
            const res = await axiosPrivate.put(`auto/cars/${props.car.id}`, formData)
            
            if(res.status===200){
                // resetForm()
                setLoading(false)
                // props.createCar(res)
            }
        } catch (error) {
            setLoading(false)
        }
    }

    return <form onSubmit={formSubmit}>
        <section className="card card-light card-body border-0 shadow-sm p-4 mb-4" id="price">
            <h2 className="h4 text-light mb-4"><i className="fi-cash text-primary fs-5 mt-n1 me-2"></i>Price</h2>
            <label className="form-label text-light" htmlFor="price">Price <span className="text-danger">*</span></label>
            <div className="mb-2">
                <select className="form-select form-select-light w-25 me-2 mb-2">
                    <option value="usd">&#36;</option>
                    <option value="eur">&#8364;</option>
                    <option value="azn">&#8380;</option>
                </select>
                <input value={price} onChange={onPriceChange} onBlur={onPriceBlur} type="number" id="price" min="200" step="50"
                    className={`form-control form-control-light w-100 me-2 mb-2 ${priceHasError?'is-invalid':'is-valid'}`}
                />
                {priceHasError ?  priceMessages.map((message, index)=>(<small key={index} className="invalid-tooltip">{message.text}</small>)):''}
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
                    <select className={`form-select form-select-light ${!brandIsValid?'is-invalid':'is-valid'}`} id="brand" defaultValue={brand} onChange={handleBrandChange}>
                        <option value="">Select make</option>
                        {props.brands.map((brand, index)=>(<option key={index} value={brand.id}>{brand.name}</option>))}
                    </select>
                    {brandHasError ?  brandMessages.map((message, index)=>(<small key={index} className="invalid-tooltip">{message.text}</small>)):''}
                </div>
                <div className="col-sm-6 mb-3">
                    <label className="form-label text-light" htmlFor="car_model">Model <span className="text-danger">*</span></label>
                    <select className={`form-select form-select-light ${!carModelIsValid?'is-invalid':'is-valid'}`} id="car_model" defaultValue={carModel} onChange={onCarModelChange}>
                        <option value="" disabled={props.carModels.length==0}>Select model</option>
                        {props.carModels.map((model, index)=>(<option key={index} value={model.id}>{model.name}</option>))}
                    </select>
                    {carModelHasError ?  carModelMessages.map((message, index)=>(<small key={index} className="invalid-tooltip">{message.text}</small>)):''}
                </div>
                <div className="col-md-3 col-sm-6 mb-3">
                    <label className="form-label text-light" htmlFor="made_at">Year <span className="text-danger">*</span></label>
                    <select onChange={onMadeAtChange} defaultValue={madeAt} className={`form-select form-select-light ${!madeAtIsValid?'is-invalid':'is-valid'}`} id="made_at">
                        <option value="">Select year</option>
                        {props.years.map((year, index)=>(<option key={index} value={year}>{year}</option>))}
                    </select>
                    {madeAtHasError ?  madeAtMessages.map((message, index)=>(<small key={index} className="invalid-tooltip">{message.text}</small>)):''}
                </div>
                <div className="col-md-3 col-sm-6 mb-3">
                    <label className="form-label text-light" htmlFor="distance">Distance <span className="text-danger">*</span></label>
                    <input value={distance} onChange={onDistanceChange} onBlur={onDistanceBlur} type="number" id="distance" min="0" 
                        className={`form-control form-control-light ${distanceHasError?'is-invalid':'is-valid'}`}
                    />
                    {distanceHasError ?  distanceMessages.map((message, index)=>(<small key={index} className="invalid-tooltip">{message.text}</small>)):''}
                </div>
            </div>
            <div className="border-top border-light mt-2 pt-4">
                <div className="row pb-2">
                <div className="col-md-6">
                    <label className="form-label text-light" htmlFor="car_body">Body type <span className="text-danger">*</span></label>
                    <select onChange={onCarBodyChange} defaultValue={carBody} className={`form-select form-select-light mb-3 ${!carBodyIsValid?'is-invalid':'is-valid'}`} id="car_body">
                        <option value="">Select body type</option>
                        {props.carBodies.map((body, index)=>(<option key={index} value={body.id}>{body.name}</option>))}
                    </select>
                    {carBodyHasError ?  carBodyMessages.map((message, index)=>(<small key={index} className="invalid-tooltip">{message.text}</small>)):''}


                    <label className="form-label text-light" htmlFor="fuel">Fuel type <span className="text-danger">*</span></label>
                    <select onChange={onFuelChange} defaultValue={fuel} className={`form-select form-select-light mb-3 ${!fuelIsValid?'is-invalid':'is-valid'}`} id="fuel">
                        <option value="">Select fuel type</option>
                        {props.fuels.map((fuel, index)=>(<option key={index} value={fuel.id}>{fuel.name}</option>))}
                    </select>
                    {fuelHasError ?  fuelMessages.map((message, index)=>(<small key={index} className="invalid-tooltip">{message.text}</small>)):''}


                    <label className="form-label text-light" htmlFor="engine">Engine <span className="text-danger">*</span></label>
                    <select onChange={onEngineChange} defaultValue={engine} className={`form-select form-select-light mb-3 ${!engineIsValid?'is-invalid':'is-valid'}`} id="engine">
                        <option value="">Select engine</option>
                        {props.engines.map((engine, index)=>(<option key={index} value={engine.id}>{engine.volume}</option>))}
                    </select>
                    {engineHasError ?  engineMessages.map((message, index)=>(<small key={index} className="invalid-tooltip">{message.text}</small>)):''}


                    <label className="form-label text-light" htmlFor="transmission">Transmission <span className="text-danger">*</span></label>
                    <select onChange={onTransmissionChange} defaultValue={transmission} className={`form-select form-select-light mb-3 ${!transmissionIsValid?'is-invalid':'is-valid'}`} id="transmission">
                        <option value="">Select transmission</option>
                        {props.transmissions.map((transmission, index)=>(<option key={index} value={transmission.id}>{transmission.name}</option>))}
                    </select>
                    {transmissionHasError ?  transmissionMessages.map((message, index)=>(<small key={index} className="invalid-tooltip">{message.text}</small>)):''}


                    <label className="form-label text-light" htmlFor="gear_lever">Gear lever <span className="text-danger">*</span></label>
                    <select onChange={onGearLeverChange} defaultValue={gearLever} className={`form-select form-select-light mb-3 ${!gearLeverIsValid?'is-invalid':'is-valid'}`} id="gear_lever">
                        <option value="">Select gear lever</option>
                        {props.gearLevers.map((lever, index)=>(<option key={index} value={lever.id}>{lever.name}</option>))}
                    </select>
                    {gearLeverHasError ?  gearLeverMessages.map((message, index)=>(<small key={index} className="invalid-tooltip">{message.text}</small>)):''}


                    <label className="form-label text-light" htmlFor="color">Color <span className="text-danger">*</span></label>
                    <select onChange={onColorChange} defaultValue={color} className={`form-select form-select-light mb-3 ${!colorIsValid?'is-invalid':'is-valid'}`} id="color">
                        <option value="">Select color</option>
                        {props.colors.map((color, index)=>(<option key={index} value={color.id}>{color.name}</option>))}
                    </select>
                    {colorHasError ?  colorMessages.map((message, index)=>(<small key={index} className="invalid-tooltip">{message.text}</small>)):''}

                </div>
                </div>
            </div>
            <div className="border-top border-light mt-2 pt-4">
                <label className="form-label text-light" htmlFor="description">Description </label>
                <textarea onChange={onDescriptionChange} onBlur={onDescriptionBlur} defaultValue={description} 
                    className={`form-control form-control-light ${descriptionHasError?'is-invalid':'is-valid'}`} 
                    id="description" rows="5" placeholder="Describe your vehicle"></textarea>
                {descriptionHasError ?  descriptionMessages.map((message, index)=>(<small key={index} className="invalid-tooltip">{message.text}</small>)):''}
                <span className="form-text text-light opacity-50">{description?.length>0?3000-description?.length:3000} characters left</span>
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
            <input ref={carImageFront} className="file-uploader file-uploader-grid bg-faded-light border-light" type="file" data-max-file-size="10MB" accept="image/png, image/jpeg, video/mp4, video/mov" data-label-idle="&lt;div className=&quot;btn btn-primary mb-3&quot;&gt;&lt;i className=&quot;fi-cloud-upload me-1&quot;&gt;&lt;/i&gt;Upload front photo&lt;/div&gt;&lt;div className=&quot;text-light opacity-70&quot;&gt;or drag them in&lt;/div&gt;"/>
            <input ref={carImageBack} className="file-uploader file-uploader-grid bg-faded-light border-light" type="file" data-max-file-size="10MB" accept="image/png, image/jpeg, video/mp4, video/mov" data-label-idle="&lt;div className=&quot;btn btn-primary mb-3&quot;&gt;&lt;i className=&quot;fi-cloud-upload me-1&quot;&gt;&lt;/i&gt;Upload back photo&lt;/div&gt;&lt;div className=&quot;text-light opacity-70&quot;&gt;or drag them in&lt;/div&gt;"/>
            <input ref={carImagePanel} className="file-uploader file-uploader-grid bg-faded-light border-light" type="file" data-max-file-size="10MB" accept="image/png, image/jpeg, video/mp4, video/mov" data-label-idle="&lt;div className=&quot;btn btn-primary mb-3&quot;&gt;&lt;i className=&quot;fi-cloud-upload me-1&quot;&gt;&lt;/i&gt;Upload front panel photo&lt;/div&gt;&lt;div className=&quot;text-light opacity-70&quot;&gt;or drag them in&lt;/div&gt;"/>
            <input ref={carImageOther} className="file-uploader file-uploader-grid bg-faded-light border-light" type="file" multiple data-max-file-size="10MB" accept="image/png, image/jpeg, video/mp4, video/mov" data-label-idle="&lt;div className=&quot;btn btn-primary mb-3&quot;&gt;&lt;i className=&quot;fi-cloud-upload me-1&quot;&gt;&lt;/i&gt;Upload additional photos&lt;/div&gt;&lt;div className=&quot;text-light opacity-70&quot;&gt;or drag them in&lt;/div&gt;"/>
        </section>

        <section className="card card-light card-body border-0 shadow-sm p-4 mb-4" id="location">
            <h2 className="h4 text-light mb-4"><i className="fi-map-pin text-primary fs-5 mt-n1 me-2"></i>Location</h2>
            <div className="row">
                <div className="col-sm-8 mb-3">
                <label className="form-label text-light" htmlFor="city">City <span className="text-danger">*</span></label>
                <select onChange={onCityChange} defaultValue={city} className={`form-select form-select-light ${!cityIsValid?'is-invalid':'is-valid'}`} id="city">
                    <option value="">Choose city</option>
                    {props.cities.map((city, index)=>(<option key={index} value={city.id}>{city.name}</option>))}
                </select>
                {cityHasError ?  cityMessages.map((message, index)=>(<small key={index} className="invalid-tooltip">{message.text}</small>)):''}
                </div>
            </div>
        </section>

        <div className="d-sm-flex justify-content-between pt-2">
            <button disabled={loading||!formIsValid} type="submit" className="btn btn-primary btn-lg d-block mb-2">Save</button>
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