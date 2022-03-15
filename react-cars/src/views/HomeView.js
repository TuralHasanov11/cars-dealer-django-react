import { useContext, useEffect } from "react"
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom"

import CarsContext from '../store/cars-context'
import ItemsContext from "../store/items-context"
import LatestCars from '../components/cars/LatestCars'
import PopularCarBodyTypes from '../components/PopularCarBodyTypes'
import Brands from '../components/Brands'
import Features from '../components/Features'
import Loading from "../components/inc/Loading"
import MainContext from "../store/main-context"



function HomeView(){
    
    const mainCtx = useContext(MainContext)
    const carsCtx = useContext(CarsContext)
    const itemsCtx = useContext(ItemsContext)

    useEffect(async ()=>{
        mainCtx.fetchLoadingToggle()
        await Promise.all([
            carsCtx.getLatestCars(),
            itemsCtx.getBrands(),
            itemsCtx.getCarBodies(),
        ]).then(()=>{
            mainCtx.fetchLoadingToggle(false)
        })

        return function cleanup() {
            mainCtx.fetchLoadingToggle()
        }
    },[])

    if(mainCtx.fetchLoading){
        return <Loading/>
    }

    return <>
        <section className="bg-top-center bg-repeat-0 pt-5" style={{'backgroundImage':'url(/assets/img/car-finder/home/hero-bg.png)', 'backgroundSize':'1920px 630px'}}>
            <div className="container pt-5">
                <div className="row pt-lg-4 pt-xl-5">
                    <div className="col-lg-4 col-md-5 pt-3 pt-md-4 pt-lg-5">
                        <h1 className="display-4 text-light pb-2 mb-4 me-md-n5">Easy way to find the right car</h1>
                        <p className="fs-lg text-light opacity-70">Finder is a leading digital marketplace for the automotive industry that connects car shoppers with sellers. </p>
                    </div>
                    <div className="col-lg-8 col-md-7 pt-md-5"><img className="d-block mt-4 ms-auto" src="/assets/img/car-finder/home/hero-img.png" width="800" alt="Car"/></div>
                </div>
            </div>
        </section>

        <PopularCarBodyTypes carBodies={itemsCtx.carBodies}/>
        <Brands brands={itemsCtx.brands}/>
        <Features/>
        {/* <section className="container pt-sm-5 pt-4 pb-3">
            <div className="d-sm-flex align-items-center justify-content-between mb-3 mb-sm-4 pb-2">
                <h2 className="h3 text-light mb-3 mb-sm-0">Latest cars</h2>
            </div>
            {carsCtx.latestCars.results?(<LatestCars cars={carsCtx.latestCars.results}/>):''}
        </section> */}
    </>
}

export default HomeView