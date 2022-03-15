import { useContext, useEffect, useState } from "react"
import { createSearchParams, useLocation, useNavigate } from "react-router-dom"
import ItemsContext from "../store/items-context"
import PropTypes from 'prop-types';
import CarsContext from "../store/cars-context";


function Filter(props){

    const itemsCtx = useContext(ItemsContext)
    const carsCtx = useContext(CarsContext)

    const [brand, setBrand] = useState(carsCtx.filterData.brand)
    const [carModel, setCarModel] = useState(carsCtx.filterData.carModel)
    const [city, setCity] = useState(carsCtx.filterData.city)
    const [minEngine, setMinEngine] = useState(carsCtx.filterData.minEngine)
    const [maxEngine, setMaxEngine] = useState(carsCtx.filterData.maxEngine)
    const [minDistance, setMinDistance] = useState(carsCtx.filterData.minDistance)
    const [maxDistance, setMaxDistance] = useState(carsCtx.filterData.maxDistance)
    const [minMadeAt, setMinMadeAt] = useState(carsCtx.filterData.minMadeAt)
    const [maxMadeAt, setMaxMadeAt] = useState(carsCtx.filterData.maxMadeAt)
    const [barter, setBarter] = useState(carsCtx.filterData.barter)
    const [credit, setCredit] = useState(carsCtx.filterData.credit)
    const [minPrice, setMinPrice] = useState(carsCtx.filterData.minPrice)
    const [maxPrice, setMaxPrice] = useState(carsCtx.filterData.maxPrice)
    const [colors, setColors] = useState(carsCtx.filterData.colors)
    const [carBodies, setCarBodies] = useState(carsCtx.filterData.carBodies)
    const [gearLevers, setGearLevers] = useState(carsCtx.filterData.gearLevers)
    const [transmissions, setTransmissions] = useState(carsCtx.filterData.transmissions)
    const [fuels, setFuels] = useState(carsCtx.filterData.fuels)
    const [equipment, setEquipment] = useState(carsCtx.filterData.equipment)
    const [isNew, setIsNew] = useState(carsCtx.filterData.isNew)

    useEffect(()=>{
        carsCtx.setFilterData({...carsCtx.filterData,
            brand,carModel,city,colors, carBodies,
            minEngine, maxEngine, gearLevers, transmissions, fuels, 
            equipment, minPrice, maxPrice,
            barter, credit, minDistance, maxDistance, 
            minMadeAt, maxMadeAt, isNew
        })
        
    },[brand,carModel,city,colors,carBodies,minEngine,maxEngine,gearLevers,transmissions,
        fuels,equipment,minDistance,maxDistance,minMadeAt,maxMadeAt,barter,credit,minPrice,maxPrice, isNew
    ])


    function onCarBodyToggle(e){
        let item = parseInt(e.target.value)
        setCarBodies(prev=>{
            if(prev.includes(item)){
                return prev.filter(function(value, index){ 
                    return value != item;
                });
            }else{
                return prev.concat([item])
            }
        })
    }

    function onGearLeverToggle(e){
        let item = parseInt(e.target.value)
        setGearLevers(prev=>{
           if(prev.includes(item)){
                return prev.filter(function(value, index){ 
                    return value != item;
                });
            }else{
                return prev.concat([item])
            }
        })
    }

    function onFuelToggle(e){
        let item = parseInt(e.target.value)
        setFuels(prev=>{
            if(prev.includes(item)){
                return prev.filter(function(value, index){ 
                    return value != item;
                });
            }else{
                return prev.concat([item])
            }
        })
    }

    function onTransmissionToggle(e){
        let item = parseInt(e.target.value)
        setTransmissions(prev=>{
            if(prev.includes(item)){
                return prev.filter(function(value, index){ 
                    return value != item;
                });
            }else{
                return prev.concat([item])
            }
        })
    }

    function onColorToggle(e){
        let item = parseInt(e.target.value)
        setColors(prev=>{
            if(prev.includes(item)){
                return prev.filter(function(value, index){ 
                    return value != item;
                });
            }else{
                return prev.concat([item])
            }
        })
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

    function onBrandChange(e){
        setBrand(e.target.value)
        itemsCtx.getCarModels(e.target.value)
    }

    function onCarModelChange(e){
        setCarModel(e.target.value)
    }

    function onCityChange(e){
        setCity(e.target.value)
    }

    function onMinPriceChange(e){
        setMinPrice(e.target.value)
    }

    function onMaxPriceChange(e){
        setMaxPrice(e.target.value)
    }

    function onMinEngineChange(e){
        setMinEngine(e.target.value)
    }

    function onMaxEngineChange(e){
        setMaxEngine(e.target.value)
    }

    function onMinDistanceChange(e){
        setMinDistance(e.target.value)
    }

    function onMaxDistanceChange(e){
        setMaxDistance(e.target.value)
    }

    function onMinYearChange(e){
        setMinMadeAt(e.target.value)
    }

    function onMaxYearChange(e){
        setMaxMadeAt(e.target.value)
    }


    return ( <div className="offcanvas offcanvas-start offcanvas-collapse bg-dark" id="filters-sidebar">
        <div className="offcanvas-header bg-transparent d-flex d-lg-none align-items-center">
        <h2 className="h5 text-light mb-0">Filters</h2>
        <button className="btn-close btn-close-white" type="button" data-bs-dismiss="offcanvas"></button>
        </div>

        <div className="offcanvas-header bg-transparent d-block border-bottom border-light pt-0 pt-lg-4 px-lg-0">
        <ul className="nav nav-tabs nav-tabs-light mb-0">
            <li className="nav-item"><button className={`${isNew?'active':''} nav-link `} onClick={()=>setIsNew(true)}>Search New</button></li>
            <li className="nav-item"><button className={`${!isNew?'active':''} nav-link `} onClick={()=>setIsNew(false)}>Search Used</button></li>
        </ul>
        </div>

        <div className="offcanvas-body py-lg-4">
       
        <div className="pb-4 mb-2">
            <h3 className="h6 text-light">Location</h3>
            <select className="form-select form-select-light mb-2" id="city" defaultValue={city} onChange={onCityChange}>
                <option value="">Any city</option>
                {props.cities.map((city, index)=>(<option key={index} value={city.id}>{city.name}</option>))}
            </select>
        </div>
        <div className="pb-4">
            <h3 className="h6 text-light">Body Type</h3>
            <div className="overflow-auto" data-simplebar data-simplebar-auto-hide="false" data-simplebar-inverse style={{'height':'11rem'}}>
            {props.carBodies.map((carBody, index)=>( <div key={index} className="form-check form-check-light">
                <input className="form-check-input" type="checkbox" checked={carBodies.includes(carBody.id)} value={carBody.id} onChange={onCarBodyToggle} id={`carBody-${carBody.id}`}/>
                <label className="form-check-label fs-sm" htmlFor={`carBody-${carBody.id}`}>{carBody.name}</label>
            </div>))}
            </div>
        </div>
        
        <div className="pb-4 mb-2">
            <h3 className="h6 text-light pt-1">Year</h3>
            <div className="d-flex align-items-center">
            <select onChange={onMinYearChange} defaultValue={minMadeAt} className="form-select form-select-light w-100" id="min_made_at">
                <option value="">From</option>
                {props.years.map((year, index)=>(<option key={index} value={year}>{year}</option>))}
            </select>
            <div className="mx-2">&mdash;</div>
            <select onChange={onMaxYearChange} defaultValue={maxMadeAt} className="form-select form-select-light w-100" id="max_made_at">
                <option value="" disabled>To</option>
                {props.years.map((year, index)=>(<option key={index} value={year}>{year}</option>))}
            </select>
            </div>
        </div>

        <div className="pb-4 mb-2">
            <h3 className="h6 text-light">Make &amp; Model</h3>
            <select className="form-select form-select-light mb-2" id="brand" defaultValue={brand} onChange={onBrandChange}>
                <option value="">Any brand</option>
                {props.brands.map((brand, index)=>(<option key={index} value={brand.id}>{brand.name}</option>))}
            </select>
            <select className="form-select form-select-light mb-2" id="car_model" defaultValue={carModel} onChange={onCarModelChange}>
                <option value="">Any model</option>
                {props.carModels.map((carModel, index)=>(<option key={index} value={carModel.id}>{carModel.name}</option>))}
            </select>
        </div>

        <div className="pb-4 mb-2">
            <h3 className="h6 text-light">Price</h3>
            <div className="range-slider range-slider-light mb-3" data-start-min="25000" data-start-max="65000" data-min="4000" data-max="100000" data-step="1000">
            <div className="range-slider-ui"></div>
            <div className="d-flex align-items-center">
                <div className="w-50 pe-2">
                <input onChange={onMinPriceChange} value={minPrice} className="form-control form-control-light range-slider-value-min" type="text"/>
                </div>
                <div className="text-muted">&mdash;</div>
                <div className="w-50 ps-2">
                <input onChange={onMaxPriceChange} value={maxPrice} className="form-control form-control-light range-slider-value-max" type="text"/>
                </div>
            </div>
            </div>
            <div className="form-check form-switch form-switch-light">
                <input className="form-check-input" type="checkbox" value={barter} onChange={()=>setBarter(prev=>!prev)} id="barter"/>
                <label className="form-check-label fs-sm" htmlFor="barter">Barter</label>
            </div>
            <div className="form-check form-switch form-switch-light">
                <input className="form-check-input" type="checkbox" value={credit} onChange={()=>setCredit(prev=>!prev)} id="credit"/>
                <label className="form-check-label" htmlFor="credit">Credit</label>
            </div>
        </div>

        <div className="pb-4 mb-2">
            <h3 className="h6 text-light">Drivetrain</h3>
            {props.gearLevers.map((gearLever, index)=>( <div key={index} className="form-check form-check-light">
                <input className="form-check-input" type="checkbox" checked={gearLevers.includes(gearLever.id)} value={gearLever.id} onChange={onGearLeverToggle} id={`gearLever-${gearLever.id}`}/>
                <label className="form-check-label fs-sm" htmlFor={`gearLever-${gearLever.id}`}>{gearLever.name}</label>
            </div>))}
        </div>
        <div className="pb-4 mb-2">
            <h3 className="h6 text-light">Fuel Type</h3>
            {props.fuels.map((fuel, index)=>( <div key={index} className="form-check form-check-light">
                <input className="form-check-input" type="checkbox" checked={fuels.includes(fuel.id)} value={fuel.id} onChange={onFuelToggle} id={`fuel-${fuel.id}`}/>
                <label className="form-check-label fs-sm" htmlFor={`fuel-${fuel.id}`}>{fuel.name}</label>
            </div>))}
        </div>
        <div className="pb-4 mb-1">
            <h3 className="h6 text-light">Transmission</h3>
            {props.transmissions.map((transmission, index)=>( <div key={index} className="form-check form-check-light">
                <input className="form-check-input" type="checkbox" checked={transmissions.includes(transmission.id)} value={transmission.id} onChange={onTransmissionToggle} id={`transmission-${transmission.id}`}/>
                <label className="form-check-label fs-sm" htmlFor={`transmission-${transmission.id}`}>{transmission.name}</label>
            </div>))}
        </div>
        
        <div className="pb-4 mb-2">
            <h3 className="h6 text-light pt-1">Distance</h3>
            <div className="d-flex align-items-center">
            <input onChange={onMinDistanceChange} value={minDistance} className="form-control form-control-light w-100" type="number" min="0" step="50" placeholder="From"/>
            <div className="mx-2">&mdash;</div>
            <input onChange={onMaxDistanceChange} value={maxDistance} className="form-control form-control-light w-100" type="number" min="0" step="50" placeholder="To"/>
            </div>
        </div>

        <div className="pb-4 mb-2">
            <h3 className="h6 text-light">Color</h3>
            <div className="overflow-auto" data-simplebar data-simplebar-auto-hide="false" data-simplebar-inverse style={{'height':'11rem'}}>
            {props.colors.map((color, index)=>( <div key={index} className="form-check form-check-light">
                <input className="form-check-input" type="checkbox" checked={colors.includes(color.id)} value={color.id} onChange={onColorToggle} id={`transmission-${color.id}`}/>
                <label className="form-check-label fs-sm" htmlFor={`color-${color.id}`}>{color.name}</label>
            </div>))}
            </div>
        </div>

        <div className="pb-4 mb-2">
            <h3 className="h6 text-light pt-1">Engine</h3>
            <div className="d-flex align-items-center">
            <select className="form-select form-select-light mb-2" id="minEngine" defaultValue={minEngine} onChange={onMinEngineChange}>
                <option value="">0</option>
                {props.engines.map((engine, index)=>(<option key={index} value={engine.volume}>{engine.volume}</option>))}
            </select>
            <div className="mx-2">&mdash;</div>
            <select className="form-select form-select-light mb-2" id="car_model" defaultValue={maxEngine} onChange={onMaxEngineChange}>
                <option value="">Bütün</option>
                {props.engines.map((engine, index)=>(<option key={index} value={engine.volume}>{engine.volume}</option>))}
            </select>
            </div>
        </div>

        <div className="pb-4">
            <h3 className="h6 text-light">Equipment</h3>
            {props.equipment.map((item, index)=>( <div key={index} className="form-check form-check-light">
                <input className="form-check-input" type="checkbox" checked={equipment.includes(item.id)} value={item.id} onChange={onEquipmentItemToggle} id={`item-${item.id}`}/>
                <label className="form-check-label fs-sm" htmlFor={`item-${item.id}`}>{item.name}</label>
            </div>))}
        </div>

        </div>

    </div>)
}

export default Filter

Filter.defaultProps = {
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
  
Filter.propTypes={
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
  