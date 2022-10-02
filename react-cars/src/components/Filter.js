import { useContext, useState } from "react"
import ItemsContext from "../store/items-context"
import PropTypes from 'prop-types';
import CarsContext from "../store/cars-context";


function Filter(props){

    const itemsCtx = useContext(ItemsContext)
    const {filterData, setFilterData} = useContext(CarsContext)
    const [minPrice, setMinPrice] = useState(filterData.minPrice)
    const [maxPrice, setMaxPrice] = useState(filterData.maxPrice)
    const [minDistance, setMinDistance] = useState(filterData.minDistance)
    const [maxDistance, setMaxDistance] = useState(filterData.maxDistance)

    function updateFilterData(data){
        setFilterData({...filterData, ...data})
    }

    function onCarBodyToggle(id){
        let item = parseInt(id)
        if(filterData.carBodies?.includes(item)){
            updateFilterData({carBodies:filterData.carBodies.filter(function(value){ 
                return value !== item;
            })??[]})
        }else{
            updateFilterData({carBodies:!filterData.carBodies?[item]:filterData.carBodies.concat([item])})
        }
    }

    function onGearLeverToggle(id){
        let item = parseInt(id)
        if(filterData.gearLevers?.includes(item)){
            updateFilterData({gearLevers:filterData.gearLevers.filter(function(value){ 
                return value !== item;
            })??[]})
        }else{
            updateFilterData({gearLevers:!filterData.gearLevers?[item]:filterData.gearLevers.concat([item])})
        }
    }

    function onFuelToggle(id){
        let item = parseInt(id)
        if(filterData.fuels?.includes(item)){
            updateFilterData({fuels:filterData.fuels.filter(function(value){ 
                return value !== item;
            })??[]})
        }else{
            updateFilterData({fuels:!filterData.fuels?[item]:filterData.fuels.concat([item])})
        }
    }

    function onTransmissionToggle(id){
        let item = parseInt(id)
        if(filterData.transmissions?.includes(item)){
            updateFilterData({transmissions:filterData.transmissions.filter(function(value){ 
                return value !== item;
            })??[]})
        }else{
            updateFilterData({transmissions:!filterData.transmissions?[item]:filterData.transmissions.concat([item])})
        }
    }

    function onColorToggle(id){
        let item = parseInt(id)
        if(filterData.colors?.includes(item)){
            updateFilterData({colors:filterData.colors.filter(function(value){ 
                return value !== item;
            })??[]})
        }else{
            updateFilterData({colors:!filterData.colors?[item]:filterData.colors.concat([item])})
        }
    }

    function onEquipmentItemToggle(id){
        let item = parseInt(id)
        if(filterData.equipment?.includes(item)){
            updateFilterData({equipment:filterData.equipment.filter(function(value){ 
                return value !== item;
            })??[]})
        }else{
            updateFilterData({equipment:!filterData.equipment?[item]:filterData.equipment.concat([item])})
        }
    }

    function onBrandChange(e){
        updateFilterData({brand:e.target.value})
        itemsCtx.getCarModels(e.target.value)
    }

    function onCarModelChange(e){
        updateFilterData({carModel:e.target.value})
    }

    function onCityChange(e){
        updateFilterData({city:e.target.value})
    }

    function onMinPriceChange(e){
        setMinPrice(e.target.value)
    }

    function onMaxPriceChange(e){
        setMaxPrice(e.target.value)
    }

    function onMinPriceBlur(e){
        setMinPrice(e.target.value)
        updateFilterData({minPrice:e.target.value})
    }

    function onMaxPriceBlur(e){
        setMaxPrice(e.target.value)
        updateFilterData({maxPrice:e.target.value})
    }

    function onMinEngineChange(e){
        updateFilterData({minEngine:e.target.value})
        updateFilterData({minEngine:e.target.value})
    }

    function onMaxEngineChange(e){
        updateFilterData({maxEngine:e.target.value})
        updateFilterData({maxEngine:e.target.value})
    }

    function onMinDistanceChange(e){
        setMinDistance(e.target.value)
        updateFilterData({minDistance:e.target.value})
    }

    function onMaxDistanceChange(e){
        setMaxDistance(e.target.value)
        updateFilterData({maxDistance:e.target.value})
    }

    function onMinDistanceBlur(e){
        setMinDistance(e.target.value)
        updateFilterData({minDistance:e.target.value})
    }

    function onMaxDistanceBlur(e){
        setMaxDistance(e.target.value)
        updateFilterData({maxDistance:e.target.value})
    }

    function onMinYearChange(e){
        updateFilterData({minMadeAt:e.target.value})
    }

    function onMaxYearChange(e){
        updateFilterData({maxMadeAt:e.target.value})
    }


    return ( <div className="offcanvas offcanvas-start offcanvas-collapse bg-dark" id="filters-sidebar">
        <div className="offcanvas-header bg-transparent d-flex d-lg-none align-items-center">
        <h2 className="h5 text-light mb-0">Filters</h2>
        <button className="btn-close btn-close-white" type="button" data-bs-dismiss="offcanvas"></button>
        </div>

        <div className="offcanvas-header bg-transparent d-block border-bottom border-light pt-0 pt-lg-4 px-lg-0">
        <ul className="nav nav-tabs nav-tabs-light mb-0">
            <li className="nav-item"><button className={`${filterData?.isNew?'active':''} nav-link `} onClick={()=>updateFilterData({isNew:true})}>Search New</button></li>
            <li className="nav-item"><button className={`${!filterData?.isNew?'active':''} nav-link `} onClick={()=>updateFilterData({isNew:false})}>Search Used</button></li>
        </ul>
        </div>

        <div className="offcanvas-body py-lg-4">
       
        <div className="pb-4 mb-2">
            <h3 className="h6 text-light">Location</h3>
            <select className="form-select form-select-light mb-2" id="city" defaultValue={filterData?.city} onChange={onCityChange}>
                <option value="">Any city</option>
                {props.cities.map((city, index)=>(<option key={index} value={city.id}>{city.name}</option>))}
            </select>
        </div>
        <div className="pb-4">
            <h3 className="h6 text-light">Body Type</h3>
            <div className="overflow-auto" data-simplebar data-simplebar-auto-hide="false" data-simplebar-inverse style={{'height':'11rem'}}>
            {props.carBodies.map((carBody, index)=>( <div key={index} className="form-check form-check-light">
                <input className="form-check-input" type="checkbox" checked={filterData?.carBodies?.includes(carBody.id)} value={carBody.id} onChange={()=>{onCarBodyToggle(carBody.id)}} id={`carBody-${carBody.id}`}/>
                <label className="form-check-label fs-sm" htmlFor={`carBody-${carBody.id}`}>{carBody.name}</label>
            </div>))}
            </div>
        </div>
        
        <div className="pb-4 mb-2">
            <h3 className="h6 text-light pt-1">Year</h3>
            <div className="d-flex align-items-center">
            <select onChange={onMinYearChange} defaultValue={filterData?.minMadeAt} className="form-select form-select-light w-100" id="min_made_at">
                <option value="">From</option>
                {props.years.map((year, index)=>(<option key={index} value={year}>{year}</option>))}
            </select>
            <div className="mx-2">&mdash;</div>
            <select onChange={onMaxYearChange} defaultValue={filterData?.maxMadeAt} className="form-select form-select-light w-100" id="max_made_at">
                <option value="">To</option>
                {props.years.map((year, index)=>(<option key={index} value={year}>{year}</option>))}
            </select>
            </div>
        </div>

        <div className="pb-4 mb-2">
            <h3 className="h6 text-light">Make &amp; Model</h3>
            <select className="form-select form-select-light mb-2" id="brand" defaultValue={filterData?.brand} onChange={onBrandChange}>
                <option value="">Any brand</option>
                {props.brands.map((brand, index)=>(<option key={index} value={brand.id}>{brand.name}</option>))}
            </select>
            <select className="form-select form-select-light mb-2" id="car_model" defaultValue={filterData?.carModel} onChange={onCarModelChange}>
                <option value="">Any model</option>
                {props.carModels.map((carModel, index)=>(<option key={index} value={carModel.id}>{carModel.name}</option>))}
            </select>
        </div>

        <div className="pb-4 mb-2">
            <h3 className="h6 text-light">Price</h3>
            <div className="range-slider range-slider-light mb-3" data-start-min="25000" data-start-max="65000" data-min="4000" data-max="100000" data-step="1000">
            <div className="d-flex align-items-center">
                <div className="w-50 pe-2">
                <input onBlur={onMinPriceBlur} onChange={onMinPriceChange} value={minPrice} className="form-control form-control-light range-slider-value-min" type="text"/>
                </div>
                <div className="text-muted">&mdash;</div>
                <div className="w-50 ps-2">
                <input onBlur={onMaxPriceBlur} onChange={onMaxPriceChange} value={maxPrice} className="form-control form-control-light range-slider-value-max" type="text"/>
                </div>
            </div>
            </div>
            <div className="form-check form-switch form-switch-light">
                <input className="form-check-input" type="checkbox" value={filterData?.barter} checked={filterData?.barter} onChange={()=>{updateFilterData({barter:!filterData?.barter})}} id="barter"/>
                <label className="form-check-label fs-sm" htmlFor="barter">Barter</label>
            </div>
            <div className="form-check form-switch form-switch-light">
                <input className="form-check-input" type="checkbox" value={filterData?.credit} checked={filterData?.credit} onChange={()=>{updateFilterData({credit:!filterData?.credit})}} id="credit"/>
                <label className="form-check-label" htmlFor="credit">Credit</label>
            </div>
        </div>

        <div className="pb-4 mb-2">
            <h3 className="h6 text-light">Drivetrain</h3>
            {props.gearLevers.map((gearLever, index)=>( <div key={index} className="form-check form-check-light">
                <input className="form-check-input" type="checkbox" value={gearLever.id} checked={filterData?.gearLevers?.includes(gearLever.id)} onChange={()=>{onGearLeverToggle(gearLever.id)}} id={`gearLever-${gearLever.id}`}/>
                <label className="form-check-label fs-sm" htmlFor={`gearLever-${gearLever.id}`}>{gearLever.name}</label>
            </div>))}
        </div>
        <div className="pb-4 mb-2">
            <h3 className="h6 text-light">Fuel Type</h3>
            {props.fuels.map((fuel, index)=>( <div key={index} className="form-check form-check-light">
                <input className="form-check-input" type="checkbox" value={fuel.id} checked={filterData?.fuels?.includes(fuel.id)} onChange={()=>{onFuelToggle(fuel.id)}} id={`fuel-${fuel.id}`}/>
                <label className="form-check-label fs-sm" htmlFor={`fuel-${fuel.id}`}>{fuel.name}</label>
            </div>))}
        </div>
        <div className="pb-4 mb-1">
            <h3 className="h6 text-light">Transmission</h3>
            {props.transmissions.map((transmission, index)=>( <div key={index} className="form-check form-check-light">
                <input className="form-check-input" type="checkbox" value={transmission.id} checked={filterData?.transmissions?.includes(transmission.id)} onChange={()=>{onTransmissionToggle(transmission.id)}} id={`transmission-${transmission.id}`}/>
                <label className="form-check-label fs-sm" htmlFor={`transmission-${transmission.id}`}>{transmission.name}</label>
            </div>))}
        </div>
        
        <div className="pb-4 mb-2">
            <h3 className="h6 text-light pt-1">Distance</h3>
            <div className="d-flex align-items-center">
            <input onBlur={onMinDistanceBlur} onChange={onMinDistanceChange} value={minDistance} className="form-control form-control-light w-100" type="number" min="0" step="50" placeholder="From"/>
            <div className="mx-2">&mdash;</div>
            <input onBlur={onMaxDistanceBlur} onChange={onMaxDistanceChange} value={maxDistance} className="form-control form-control-light w-100" type="number" min="0" step="50" placeholder="To"/>
            </div>
        </div>

        <div className="pb-4 mb-2">
            <h3 className="h6 text-light">Color</h3>
            <div className="overflow-auto" data-simplebar data-simplebar-auto-hide="false" data-simplebar-inverse style={{'height':'11rem'}}>
            {props.colors.map((color, index)=>( <div key={index} className="form-check form-check-light">
                <input className="form-check-input" type="checkbox" value={color.id} checked={filterData?.colors?.includes(color.id)} onChange={()=>{onColorToggle(color.id)}} id={`color-${color.id}`}/>
                <label className="form-check-label fs-sm" htmlFor={`color-${color.id}`}>{color.name}</label>
            </div>))}
            </div>
        </div>

        <div className="pb-4 mb-2">
            <h3 className="h6 text-light pt-1">Engine</h3>
            <div className="d-flex align-items-center">
            <select className="form-select form-select-light mb-2" id="minEngine" defaultValue={filterData?.minEngine} onChange={onMinEngineChange}>
                <option value="">0</option>
                {props.engines.map((engine, index)=>(<option key={index} value={engine.volume}>{engine.volume}</option>))}
            </select>
            <div className="mx-2">&mdash;</div>
            <select className="form-select form-select-light mb-2" id="car_model" defaultValue={filterData?.maxEngine} onChange={onMaxEngineChange}>
                <option value="">All</option>
                {props.engines.map((engine, index)=>(<option key={index} value={engine.volume}>{engine.volume}</option>))}
            </select>
            </div>
        </div>

        <div className="pb-4">
            <h3 className="h6 text-light">Equipment</h3>
            {props.equipment.map((item, index)=>( <div key={index} className="form-check form-check-light">
                <input className="form-check-input" type="checkbox" value={item.id} checked={filterData?.equipment?.includes(item.id)} onChange={()=>{onEquipmentItemToggle(item.id)}} id={`item-${item.id}`}/>
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
  