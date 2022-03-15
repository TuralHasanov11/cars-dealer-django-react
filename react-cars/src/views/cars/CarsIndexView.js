import Cars from '../../components/cars/Cars'
import Filter from '../../components/Filter'
import Sorting from '../../components/cars/Sorting'
import Pagination from '../../components/Pagination'
import { createSearchParams, Link, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import CarsContext from '../../store/cars-context'
import { useCallback, useContext, useEffect, useState } from 'react'
import ItemsContext from '../../store/items-context'
import MainContext from '../../store/main-context'
import Loading from '../../components/inc/Loading'


function CarsIndexView(){

    const [searchParams, setSearchParams] = useSearchParams();

    const mainCtx = useContext(MainContext)
    const itemsCtx = useContext(ItemsContext)
    const carsCtx = useContext(CarsContext)
    const {filterData, setFilterData} = useContext(CarsContext)



    useEffect(async ()=>{
        mainCtx.fetchLoadingToggle()
        await Promise.all([
            itemsCtx.getBrands(),
            itemsCtx.getCarBodies(),
            itemsCtx.getCities(),
            itemsCtx.getGearLevers(),
            itemsCtx.getTransmissions(),
            itemsCtx.getColors(),
            itemsCtx.getFuels(),
            itemsCtx.getEngines(),
            itemsCtx.getEquipment(),
        ]).then(()=>{
            mainCtx.fetchLoadingToggle(false)
        })

        return function cleanup() {
            mainCtx.fetchLoadingToggle()
        }
    },[])

    useEffect(()=>{
        filterCars()
    },[ filterData.brand, filterData.carModel, filterData.city, filterData.colors, filterData.carBodies,
        filterData.minEngine, filterData.maxEngine, filterData.gearLevers, filterData.transmissions, filterData.fuels,
        filterData.equipment, filterData.minPrice, filterData.maxPrice, filterData.barter, filterData.credit, 
        filterData.minDistance, filterData.maxDistance, filterData.minMadeAt, filterData.maxMadeAt, filterData.isNew
    ])

    
    async function filterCars(p=1){
        mainCtx.fetchLoadingToggle()  
        await carsCtx.getCars({
            brand:filterData.brand,
            car_model:filterData.carModel,
            city:filterData.city,
            color:filterData.colors, 
            car_body:filterData.carBodies,
            min_engine:filterData.minEngine, 
            max_engine:filterData.maxEngine,
            gear_lever:filterData.gearLevers, 
            transmission:filterData.transmissions, 
            fuel:filterData.fuels, 
            equipment:filterData.equipment, 
            min_price:filterData.minPrice, 
            max_price:filterData.maxPrice,
            barter:filterData.barter, credit:filterData.credit, 
            min_distance:filterData.minDistance, max_distance:filterData.maxDistance, 
            min_made_at:filterData.minMadeAt, max_made_at:filterData.maxMadeAt, is_new:filterData.isNew, 
            ordering:filterData.ordering,
            page:p
        })
        .then(()=>{
            mainCtx.fetchLoadingToggle(false)
        })
    }

    if(mainCtx.fetchLoading){
        return <Loading/>
    }
   

    return <>
        <div className="container mt-5 mb-md-4 py-5">
            <div className="row py-md-1">
                <div className="col-lg-3 pe-xl-4">
                    <Filter 
                        params={Object.fromEntries([...searchParams])} 
                        brands={itemsCtx.brands}
                        carModels={itemsCtx.carModels}
                        cities={itemsCtx.cities}
                        colors={itemsCtx.colors}
                        carBodies={itemsCtx.carBodies}
                        engines={itemsCtx.engines}
                        equipment={itemsCtx.equipment}
                        gearLevers={itemsCtx.gearLevers}
                        transmissions={itemsCtx.transmissions}
                        fuels={itemsCtx.fuels}
                        years={itemsCtx.years}
                    />
                </div>

                <div className="col-lg-9">
                    <nav className="mb-3 pt-md-2 pt-lg-4" aria-label="Breadcrumb">
                        <ol className="breadcrumb breadcrumb-light">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Cars</li>
                        </ol>
                    </nav>

                    <div className="d-flex align-items-center justify-content-between pb-4 mb-2">
                        <h1 className="text-light me-3 mb-0">{filterData.isNew?'New cars':'Used cars'}</h1>
                        <div className="text-light"><i className="fi-car fs-lg me-2"></i><span className="align-middle">{carsCtx.cars?.count}</span></div>
                    </div>

                    <div className="d-sm-flex align-items-center justify-content-between pb-4 mb-2">
                        <Sorting onOrderChange={filterCars}/>
                    </div>

                    <Cars cars={carsCtx.cars?.results} searchParams={searchParams}/>
                    <div className="d-flex align-items-center justify-content-between py-2">
                        <Sorting onOrderChange={filterCars}/>
                        <Pagination 
                            currentPage={carsCtx.cars?.current_page}
                            count={carsCtx.cars?.count}
                            links={carsCtx.cars?.links}
                            perPage={carsCtx.cars?.per_page}
                            totalPages={carsCtx.cars?.total_pages}
                            onPageChange={filterCars}
                        />
                    </div>
                    
                    
                </div>
            </div>
        </div>
        </>
}

export default CarsIndexView