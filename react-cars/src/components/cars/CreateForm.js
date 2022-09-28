import { useContext, useRef, useState } from "react";
import ItemsContext from "../../store/items-context";
import CarsContext from "../../store/cars-context"
import PropTypes from 'prop-types';
import { useInput } from "../../hooks/useInput";
import { validations } from "../../hooks/useValidation";
import { useNavigate } from "react-router-dom";


export default function CreateForm(props){

    const navigate = useNavigate();
    const itemsCtx = useContext(ItemsContext)
    const [equipment, setEquipment] = useState([])
    const [barter, setBarter] = useState(false)
    const [credit, setCredit] = useState(false)
    const {setCarPreview, setCarFormData} = useContext(CarsContext)


    const {
        value: brand, 
        isValid: brandIsValid,
        hasError:brandHasError, 
        valueChange: onBrandChange, 
        reset:resetBrand,
        messages:brandMessages,
    } = useInput({validations:validations, rules:{required:true,}})

    const {
        value: carModel, 
        isValid: carModelIsValid,
        hasError:carModelHasError, 
        valueChange: onCarModelChange, 
        reset:resetCarModel,
        messages:carModelMessages,
    } = useInput({validations:validations, rules:{required:true,}})

    const {
        value: city, 
        isValid: cityIsValid,
        hasError:cityHasError, 
        valueChange: onCityChange, 
        reset:resetCity,
        messages:cityMessages,
    } = useInput({validations:validations, initialState:"1", rules:{required:true,}})

    const {
        value: currency, 
        isValid: currencyIsValid,
        hasError:currencyHasError, 
        valueChange: onCurrencyChange, 
        reset:resetCurrency,
        messages:currencyMessages,
    } = useInput({validations:validations, initialState:"azn", rules:{required:true,}})

    const {
        value: color, 
        isValid: colorIsValid,
        hasError:colorHasError, 
        valueChange: onColorChange, 
        reset:resetColor,
        messages:colorMessages,
    } = useInput({validations:validations, initialState:"1", rules:{required:true,}})

    const {
        value: carBody, 
        isValid: carBodyIsValid,
        hasError:carBodyHasError, 
        valueChange: onCarBodyChange, 
        reset:resetCarBody,
        messages:carBodyMessages,
    } = useInput({validations:validations, initialState:"1", rules:{required:true,}})

    const {
        value: engine, 
        isValid: engineIsValid,
        hasError:engineHasError, 
        valueChange: onEngineChange, 
        reset:resetEngine,
        messages:engineMessages,
    } = useInput({validations:validations, initialState:"1", rules:{required:true,}})

    const {
        value: gearLever, 
        isValid: gearLeverIsValid,
        hasError:gearLeverHasError, 
        valueChange: onGearLeverChange, 
        reset:resetGearLever,
        messages:gearLeverMessages,
    } = useInput({validations:validations, initialState:"1", rules:{required:true,}})

    const {
        value: transmission, 
        isValid: transmissionIsValid,
        hasError:transmissionHasError, 
        valueChange: onTransmissionChange, 
        reset:resetTransmission,
        messages:transmissionMessages,
    } = useInput({validations:validations, initialState:"1", rules:{required:true,}})

    const {
        value: fuel, 
        isValid: fuelIsValid,
        hasError:fuelHasError, 
        valueChange: onFuelChange, 
        reset:resetFuel,
        messages:fuelMessages,
    } = useInput({validations:validations, initialState:"1", rules:{required:true,}})


    const {
        value: distance, 
        isValid: distanceIsValid,
        hasError:distanceHasError, 
        valueChange: onDistanceChange, 
        valueBlur: onDistanceBlur,
        reset:resetDistance,
        messages:distanceMessages,
    } = useInput({validations:validations, initialState:0,rules:{required:true,isInteger:true,min:0, max:1000000}})

    const {
        value: madeAt, 
        isValid: madeAtIsValid,
        hasError:madeAtHasError, 
        valueChange: onMadeAtChange, 
        reset:resetMadeAt,
        messages:madeAtMessages,
    } = useInput({validations:validations, initialState:2012, rules:{required:true,isInteger:true,min:1980, max:new Date().getFullYear()}})

    const {
        value: price, 
        isValid: priceIsValid,
        hasError:priceHasError, 
        valueChange: onPriceChange, 
        valueBlur: onPriceBlur,
        reset:resetPrice,
        messages:priceMessages,
    } = useInput({validations:validations, initialState:12000 ,rules:{required:true,isInteger:true,min:200}})

    const {
        value: description, 
        isValid: descriptionIsValid,
        hasError:descriptionHasError, 
        valueChange: onDescriptionChange, 
        valueBlur: onDescriptionBlur,
        reset:resetDescription,
        messages:descriptionMessages,
    } = useInput({validations:validations, initialState:"Description", rules:{nullable:true}})

    const carImageFront = useRef()
    const carImageBack = useRef()
    const carImagePanel = useRef()
    const carImageOther = useRef()

    function handleBrandChange(e){
        onBrandChange(e)
        itemsCtx.getCarModels(e.target.value)
    }

    function onEquipmentItemToggle(e){
        let item = parseInt(e.target.value)
        setEquipment(prev=>{
            if(prev.includes(item)){
                return prev.filter(function(value, index){ 
                    return value !== item;
                });
            }else{
                return prev.concat([item])
            }
        })
    }

    
    let formIsValid = (brandIsValid && carModelIsValid && cityIsValid && colorIsValid && carBodyIsValid && engineIsValid &&  gearLeverIsValid && 
        transmissionIsValid && fuelIsValid && distanceIsValid && madeAtIsValid && priceIsValid && descriptionIsValid && currencyIsValid)


    async function createCar(e){

        e.preventDefault()
    
        if(!formIsValid){
            return
        }

        setCarPreview({
            brand: parseInt(brand),
            car_model: parseInt(carModel),
            city: parseInt(city),
            currency,
            color: parseInt(color),
            car_body: parseInt(carBody),
            engine: parseInt(engine),
            gear_lever: parseInt(gearLever),
            transmission: parseInt(transmission),
            fuel: parseInt(fuel),
            equipment: equipment,
            price: parseInt(price),
            barter,
            credit,
            distance: parseInt(distance),
            description,
            made_at: parseInt(madeAt),
            front_image: {"image": URL.createObjectURL(carImageFront.current.files[0]), "file": carImageFront.current.files[0]},
            back_image: {"image": URL.createObjectURL(carImageBack.current.files[0]), "file": carImageBack.current.files[0]},
            panel_image: {"image": URL.createObjectURL(carImagePanel.current.files[0]), "file": carImagePanel.current.files[0]},
            other_images: Array.prototype.slice.call(carImageOther.current.files).map(file => {
                    return {image: URL.createObjectURL(file), file: file}
                })
            })

        navigate("/checkout")
    }


    return <>

        <form onSubmit={createCar}>
         <section className="card card-light card-body border-0 shadow-sm p-4 mb-4" id="price">
            <h2 className="h4 text-light mb-4"><i className="fi-cash text-primary fs-5 mt-n1 me-2"></i>Price</h2>
            <label className="form-label text-light" htmlFor="price">Price <span className="text-danger">*</span></label>
            <div className="mb-2">
                <select defaultValue={currency} onChange={onCurrencyChange}  className="form-select form-select-light w-25 me-2 mb-2">
                    <option value="usd">&#36;</option>
                    <option value="eur">&#8364;</option>
                    <option value="azn">&#8380;</option>
                </select>
                <input value={price} onChange={onPriceChange} onBlur={onPriceBlur} type="number" id="price" min="200" step="50"
                    className={`form-control form-control-light w-100 me-2 mb-2 ${priceHasError?'is-invalid':'is-valid'}`}
                />
                {currencyHasError ?  currencyMessages.map((message, index)=>(<small key={index} className="invalid-tooltip">{message.text}</small>)):''}
                {priceHasError ?  priceMessages.map((message, index)=>(<small key={index} className="invalid-tooltip">{message.text}</small>)):''}
            </div>
            <div className="form-check form-switch form-switch-light">
                <input type="checkbox" value={barter} onChange={()=>setBarter(prev=>!prev)} id="barter" className={`form-check-input`}
                />
                <label className="form-check-label" htmlFor="barter">Barter</label>
            </div>
            <div className="form-check form-switch form-switch-light">
                <input type="checkbox" value={credit} onChange={()=>setCredit(prev=>!prev)} id="credit" className={`form-check-input`}/>
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
                            <input 
                                className="form-check-input" 
                                type="checkbox" 
                                checked={equipment.includes(item.id)} 
                                value={item.id} 
                                onChange={onEquipmentItemToggle} 
                                id={`item-${item.id}`}
                            />
                            <label className="form-check-label" htmlFor={`item-${item.id}`}>{item.name}</label>
                        </div>
                    </div>
                ))}
                </div>
            </div>
           
        </section>

        <section className="card card-light card-body shadow-sm p-4 mb-4" id="photos">
            <h2 className="h4 text-light mb-4"><i className="fi-image text-primary fs-5 mt-n1 me-2"></i>Photos</h2>
            <div className="alert alert-warning bg-faded-warning border-warning mb-4" role="alert">
                <div className="d-flex"><i className="fi-alert-circle me-2 me-sm-3"></i>
                <p className="fs-sm mb-1">The maximum photo size is 8 MB. Formats: jpeg, jpg, png. Put the main picture first.<br/>The maximum video size is 10 MB. Formats: mp4, mov.</p>
                </div>
            </div>
            <input ref={carImageFront} className="file-uploader file-uploader-grid bg-faded-light border-light" type="file" data-max-file-size="10MB" accept="image/png, image/jpeg" data-label-idle="&lt;div className=&quot;btn btn-primary mb-3&quot;&gt;&lt;i className=&quot;fi-cloud-upload me-1&quot;&gt;&lt;/i&gt;Upload front photo&lt;/div&gt;&lt;div className=&quot;text-light opacity-70&quot;&gt;or drag them in&lt;/div&gt;"/>
            <input ref={carImageBack} className="file-uploader file-uploader-grid bg-faded-light border-light" type="file" data-max-file-size="10MB" accept="image/png, image/jpeg" data-label-idle="&lt;div className=&quot;btn btn-primary mb-3&quot;&gt;&lt;i className=&quot;fi-cloud-upload me-1&quot;&gt;&lt;/i&gt;Upload back photo&lt;/div&gt;&lt;div className=&quot;text-light opacity-70&quot;&gt;or drag them in&lt;/div&gt;"/>
            <input ref={carImagePanel} className="file-uploader file-uploader-grid bg-faded-light border-light" type="file" data-max-file-size="10MB" accept="image/png, image/jpeg" data-label-idle="&lt;div className=&quot;btn btn-primary mb-3&quot;&gt;&lt;i className=&quot;fi-cloud-upload me-1&quot;&gt;&lt;/i&gt;Upload front panel photo&lt;/div&gt;&lt;div className=&quot;text-light opacity-70&quot;&gt;or drag them in&lt;/div&gt;"/>
            <input ref={carImageOther} className="file-uploader file-uploader-grid bg-faded-light border-light" type="file" multiple data-max-file-size="10MB" accept="image/png, image/jpeg" data-label-idle="&lt;div className=&quot;btn btn-primary mb-3&quot;&gt;&lt;i className=&quot;fi-cloud-upload me-1&quot;&gt;&lt;/i&gt;Upload additional photos&lt;/div&gt;&lt;div className=&quot;text-light opacity-70&quot;&gt;or drag them in&lt;/div&gt;"/>
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
            <button disabled={!formIsValid} type="submit" className="btn btn-primary btn-lg d-block mb-2">Save</button>
        </div>
    </form>

    </>

           
};

CreateForm.defaultProps = {
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
  
CreateForm.propTypes={
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
  