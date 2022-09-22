import Cars from '../../components/cars/Cars'
import Filter from '../../components/Filter'
import Sorting from '../../components/cars/Sorting'
import Pagination from '../../components/Pagination'
import { Link, useSearchParams } from 'react-router-dom'
import CarsContext from '../../store/cars-context'
import { useCallback, useContext, useEffect, useState } from 'react'
import ItemsContext from '../../store/items-context'
import Loading from '../../components/inc/Loading'


function CarsIndexView(){

    const [searchParams, setSearchParams] = useSearchParams();
    const [loading, setLoading] = useState(false)
    const itemsCtx = useContext(ItemsContext)
    const {filterData, setFilterData, cars, getCars} = useContext(CarsContext)

    useEffect(()=>{
        setLoading(true)
        async function getCarItems(){
            await itemsCtx.getItems()
        }

        getCarItems()
        setLoading(false)

        return function cleanup() {
            setFilterData({})
        }

    },[])

   const filterCars = async (p=1) => {
        setLoading(true)

        await getCars({
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
            min_made_at:filterData.minMadeAt, max_made_at:filterData.maxMadeAt, 
            is_new:filterData.isNew, 
            ordering:filterData.ordering,
            page:p
        })
    
        setLoading(false)
    }

    useEffect(()=>{
        filterCars()
    }, [filterData])


    return (loading?<Loading/>:<div className="container mt-5 mb-md-4 py-5">
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
                <div className="text-light"><i className="fi-car fs-lg me-2"></i><span className="align-middle">{cars?.count}</span></div>
            </div>

            <div className="d-sm-flex align-items-center justify-content-between pb-4 mb-2">
                <Sorting/>
            </div>

            <Cars cars={cars?.results} searchParams={searchParams}/>
            <div className="d-flex align-items-center justify-content-between py-2">
                <Sorting/>
                <Pagination 
                    currentPage={cars?.current_page}
                    count={cars?.count}
                    links={cars?.links}
                    perPage={cars?.per_page}
                    totalPages={cars?.total_pages}
                    onPageChange={filterCars}
                />
            </div>
            
            
        </div>
    </div>
</div>)
}

export default CarsIndexView