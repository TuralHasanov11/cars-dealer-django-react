import { useContext, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import CarsContext from '../../store/cars-context'
import Car from '../../components/cars/Car'
import MainContext from "../../store/main-context"
import Loading from '../../components/inc/Loading'

function CarsSingleView(){

    const navigate = useNavigate()
    const mainCtx = useContext(MainContext)
    const {id} = useParams()
    const carsCtx = useContext(CarsContext)

    
    useEffect(async()=>{
        mainCtx.fetchLoadingToggle()
        await Promise.all([
            carsCtx.getCar(id),
        ]).then(()=>{
            mainCtx.fetchLoadingToggle(false)
        })

        return function cleanup() {
            mainCtx.fetchLoadingToggle()
        }
    },[id])

    function deleteCar(){
        // carsCtx.deleteCar(carsCtx.car)
        //     .then(res=>{
        //         navigate(`/`, { replace: true });
        //     })
        //     .catch(e=>{
        //         console.log(e)
        //     })
    }

    if(mainCtx.fetchLoading){
        return <Loading/>
    }


    return (<div className="container mt-5 mb-md-4 py-5">
        <nav className="mb-3 pt-md-3" aria-label="Breadcrumb">
            <ol className="breadcrumb breadcrumb-light">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item active" aria-current="page">
                    {carsCtx.car?.car_model?.brand?.name + ' ' + carsCtx.car?.car_model?.name}
                </li>
                <li className="breadcrumb-item"><Link to={`/cars/${carsCtx.car?.id}/edit`}>Edit</Link></li>
            </ol>
        </nav>

        <Car car={carsCtx.car} deleteCar={deleteCar}/>
    </div>)
}

export default CarsSingleView