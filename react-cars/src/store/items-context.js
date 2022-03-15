import { createContext, useState } from "react";
import axiosInstance from "../axios";

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
    const [years, setYears] = useState([2013,2021,2022])
    const [selectedBrand, setSelectedBrand] = useState([])


    async function getItems(){
        await axiosInstance.all(['brands', 'cities', 'colors', 'car-bodies', 'engines', 
                'equipment', 'gear-levers', 'transmissions', 'fuels'
            ])
            .then(axiosInstance.spread((...responses)=>{
                setBrands(responses[0])
                setCities(responses[1])
                setColors(responses[2])
                setCarBodies(responses[3])
                setEngines(responses[4])
                setEquipment(responses[5])
                setGearLevers(responses[6])
                setTransmissions(responses[7])
                setFuels(responses[8])
            }))
            .catch((e)=>{
                console.log(e)
            })
    }

    async function getBrands(){
        const {data} = await axiosInstance.get(`brands`)
        setBrands(data)
    }

    async function getCarModels(brandId){
        if(brandId!=''){
            const {data} = await axiosInstance.get(`brands/${brandId}/models`)
            setCarModels(data)
        }else{
            setCarModels([])
        }
    }

    async function getCities(){
        const {data} = await axiosInstance.get(`cities`)
        setCities(data)
    }

    async function getColors(){
        const {data} = await axiosInstance.get(`colors`)
        setColors(data)
    }

    async function getCarBodies(){
        const {data} = await axiosInstance.get(`car-bodies`)
        setCarBodies(data)
    }

    async function getEngines(){
        const {data} = await axiosInstance.get(`engines`)
        setEngines(data)
    }

    async function getEquipment(){
        const {data} = await axiosInstance.get(`equipment`)
        setEquipment(data)
    }

    async function getGearLevers(){
        const {data} = await axiosInstance.get(`gear-levers`)
        setGearLevers(data)
    }

    async function getTransmissions(){
        const {data} = await axiosInstance.get(`transmissions`)
        setTransmissions(data)
    }

    async function getFuels(){
        const {data} = await axiosInstance.get(`fuels`)
        setFuels(data)
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