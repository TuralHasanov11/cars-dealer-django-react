import { useContext, useEffect, useState } from "react"
import CarsContext from '../store/cars-context'
import LatestCars from '../components/cars/Latest'
import Hero from "../components/Hero"
import Features from '../components/Features'
import Loading from "../components/inc/Loading"

function HomeView(){
    
    const carsCtx = useContext(CarsContext)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        async function fetchSearchData(){
            await Promise.all([
                carsCtx.getLatestCars(),
            ])
        }

        fetchSearchData()
        setLoading(false)

        return function cleanup() {}
    }, [])

    return (loading?<Loading/>:<>
        <Hero />
        <Features/>
        <LatestCars cars={carsCtx.latestCars.results}/>
    </>)
}

export default HomeView