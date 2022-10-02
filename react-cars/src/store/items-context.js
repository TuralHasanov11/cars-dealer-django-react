import { createContext, useState } from "react";
import axios from "../axios";

const ItemsContext = createContext({
    brands:[],
    selectedBrand:{},
    carModels:[],
    cities:[],
    colors:[],
    carBodies:[],
    engines:[],
    equipment:[],
    gearLevers:[],
    transmissions:[],
    fuels:[],
    years:[], // change
    getItems:()=>{},
    getBrands:()=>{},
    getCarModels:()=>{},
    getCities:()=>{},
    getColors:()=>{},
    getCarBodies:()=>{},
    getEngines:()=>{},
    getEquipment:()=>{},
    getGearLevers:()=>{},
    getTransmissions:()=>{},
    getFuels:()=>{},
})

export function ItemsContextProvider(props){

    const [brands, setBrands] = useState([])
    const [carModels,setCarModels] = useState([])
    const [cities, setCities] = useState([])
    const [colors, setColors] = useState([])
    const [carBodies, setCarBodies] = useState([])
    const [engines, setEngines] = useState([])
    const [equipment, setEquipment] = useState([])
    const [gearLevers, setGearLevers] = useState([])
    const [transmissions, setTransmissions] = useState([])
    const [fuels, setFuels] = useState([])
    const [years, setYears] = useState([2010, 2011, 2012, 2013,2014,2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022])

    async function getItems(){
        try {
            await Promise.all([
                getBrands(), 
                getCities(), 
                getColors(), 
                getCarBodies(),
                getEngines(),
                getEquipment(),
                getGearLevers(),
                getTransmissions(),
                getFuels()
            ])
        } catch (error) {
            console.log(error.response)
            throw error
        }
    }

    async function getBrands(){
        try {
            const {data} = await axios.get(`auto/brands`)
            setBrands(data)
        } catch (error) {
            console.log(error.response)
            throw error
        }
    }

    async function getCarModels(brandId){
        try {
            if(brandId!=''){
                const {data} = await axios.get(`auto/brands/${brandId}/models`)
                setCarModels(data)
            }else{
                setCarModels([])
            }
        } catch (error) {
            console.log(error.response)
            throw error
        }
    }

    async function getCities(){
        try {
            const {data} = await axios.get(`auto/cities`)
            setCities(data)
        } catch (error) {
            console.log(error.response)
            throw error
        }
    }

    async function getColors(){
       try {
            const {data} = await axios.get(`auto/colors`)
            setColors(data)
       } catch (error) {
            console.log(error.response)
            throw error
       }
    }

    async function getCarBodies(){
        try {
            const {data} = await axios.get(`auto/car-bodies`)
            setCarBodies(data)
        } catch (error) {
            console.log(error.response)
            throw error
        }
    }

    async function getEngines(){
        try {
            const {data} = await axios.get(`auto/engines`)
            setEngines(data)
        } catch (error) {
            console.log(error.response)
            throw error
        }
    }

    async function getEquipment(){
        try {
            const {data} = await axios.get(`auto/equipment`)
            setEquipment(data)
        } catch (error) {
            console.log(error.response)
            throw error
        }
    }

    async function getGearLevers(){
        try {
            const {data} = await axios.get(`auto/gear-levers`)
            setGearLevers(data)
        } catch (error) {
            console.log(error.response)
            throw error
        }
    }

    async function getTransmissions(){
        try {
            const {data} = await axios.get(`auto/transmissions`)
            setTransmissions(data)
        } catch (error) {
            console.log(error.response)
            throw error
        }
    }

    async function getFuels(){
        try {
            const {data} = await axios.get(`auto/fuels`)
            setFuels(data)
        } catch (error) {
            console.log(error.response)
            throw error
        }
    }
    


    return <ItemsContext.Provider value={{
        brands,
        carModels,
        cities,
        colors,
        carBodies,
        engines,
        equipment,
        gearLevers,
        transmissions,
        fuels,
        years,
        getBrands,
        getCarModels,
        getCities,
        getColors,
        getCarBodies,
        getEngines,
        getEquipment,
        getGearLevers,
        getTransmissions,
        getFuels,
        getItems,
    }}>
        {props.children}
    </ItemsContext.Provider>
}

export default ItemsContext