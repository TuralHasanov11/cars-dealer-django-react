import { createContext, useState } from "react";
import axios from "../axios";

const CarsContext = createContext({
    cars:{},
    car:{},
    latestCars:{},
    filterData:{},
    onFilter:false, 
    setOnFilter:()=>{},
    setFilterData:()=>{},
    getCars:()=>{},
    getLatestCars:()=>{},
    getCar:()=>{},
    carPreview: {}, 
    setCarPreview: ()=>{},
    carFormData:{}, 
    setCarFormData: ()=>{}
})

export function CarsContextProvider(props){

    const [cars, setCars] = useState({})
    const [car,setCar] = useState({})
    const [latestCars,setLatestCars] = useState({})
    const [filterData, setFilterData] = useState({
        brand:'',
        carModel:'',
        city:'',
        minEngine:'',
        maxEngine:'',
        minDistance:'',
        maxDistance:'',
        minMadeAt:'',
        maxMadeAt:'',
        barter:false,
        credit:false,
        minPrice:'',
        maxPrice:'',
        colors:[],
        carBodies:[],
        gearLevers:[],
        transmissions:[],
        fuels:[],
        equipment:[],
        isNew:false,
        ordering:'-created_at'
    })

    const [onFilter, setOnFilter] = useState(false)
    const [carPreview, setCarPreview] = useState({})
    const [carFormData, setCarFormData] = useState(new FormData())


    async function getCars(query={}){
        const {data} = await axios.get(`auto/cars`,{params:query})
        setCars(data)
    }

    async function getLatestCars(query={}){
        const {data} = await axios.get(`auto/cars`,{params:{page_size:20}})
        setLatestCars(data)
    }

    async function getCar(car){
        const {data} = await axios.get(`auto/cars/${car}`)
        setCar(data)
        return data
    }


    return <CarsContext.Provider value={{
        cars,
        car,
        latestCars,
        filterData,
        onFilter, 
        setOnFilter,
        setFilterData,
        getCars,
        getLatestCars,
        getCar,
        carPreview, 
        setCarPreview,
        carFormData, 
        setCarFormData
    }}>
        {props.children}
    </CarsContext.Provider>
}

export default CarsContext