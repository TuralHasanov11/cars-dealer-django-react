import { useContext, useEffect, useState } from "react"
import CarsContext from '../store/cars-context'
import ItemsContext from "../store/items-context"
import LatestCars from '../components/cars/LatestCars'
import Hero from "../components/Hero"
import PopularCarBodyTypes from '../components/PopularCarBodyTypes'
import Brands from '../components/Brands'
import Features from '../components/Features'
import Loading from "../components/inc/Loading"

function HomeView(){
    
    const carsCtx = useContext(CarsContext)
    const itemsCtx = useContext(ItemsContext)
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        setLoading(false)
        async function fetchSearchData(){
            await Promise.all([
                carsCtx.getLatestCars(),
                itemsCtx.getBrands(),
                itemsCtx.getCarBodies(),
            ]).then(()=>{
                setLoading(false)
            })
        }

        setLoading(true)
        fetchSearchData()

        return function cleanup() {}
    }, [])

    return (loading?<Loading/>:<>
        <Hero />

        <PopularCarBodyTypes carBodies={itemsCtx.carBodies}/>
        <Brands brands={itemsCtx.brands}/>
        <Features/>
        <LatestCars cars={carsCtx.latestCars.results}/>
    </>)
}

export default HomeView