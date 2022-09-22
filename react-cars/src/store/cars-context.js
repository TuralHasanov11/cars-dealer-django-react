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
    createCar:()=>{},
    updateCar:()=>{},
    deleteCar:()=>{},
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


    async function getCars(query={}){
        const {data} = await axios.get(`auto/cars`,{params:query})
        setCars(data)
    }

    async function getLatestCars(query={}){
        const {data} = await axios.get(`auto/cars`,{params:{page_size:10}})
        setLatestCars(data)
    }

    async function getCar(car){
        const {data} = await axios.get(`auto/cars/${car}`)
        setCar(data)
        return data
    }

    async function createCar(formData){
        try {
            const res = await axios.post(`auto/cars`, formData)
            
            if(res.ok){
                return res
            }
        } catch (error) {
            throw error
        }
    }

    async function updateCar(car, formData){
        try {
            const res = await axios.put(`auto/cars/${car.id}`,formData)
            
            if(res.ok){
                return res
            }
        } catch (error) {
            throw error
        }
    }

    async function deleteCar(car){
        try {
            const res = await axios.delete(`auto/cars/${car.id}`)

            if(res.ok){
                setCar({})
                return res
            }
        } catch (error) {
            throw error
        }
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
        createCar,
        updateCar,
        deleteCar
    }}>
        {props.children}
    </CarsContext.Provider>
}

export default CarsContext