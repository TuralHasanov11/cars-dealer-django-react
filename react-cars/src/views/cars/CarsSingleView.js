import { useContext, useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import CarsContext from '../../store/cars-context'
import Car from '../../components/cars/Car'
import Loading from '../../components/inc/Loading'

function CarsSingleView(){

    const {id} = useParams()
    const {getCar, car, deleteCar} = useContext(CarsContext)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    
    useEffect(()=>{
        setLoading(true)
        
        async function getCarDetail(id){
            await getCar(id)
        }

        getCarDetail(id)

        setLoading(false)

        return function cleanup() {}
    },[id])

    function deleteCarHandler(){
        deleteCar(car)
            .then(res=>{
                navigate(`/`, { replace: true });
            })
            .catch(e=>{
                console.log(e)
            })
    }

    return (loading?<Loading/>:<div className="container mt-5 mb-md-4 py-5">
        <nav className="mb-3 pt-md-3" aria-label="Breadcrumb">
            <ol className="breadcrumb breadcrumb-light">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item active" aria-current="page">
                    {car?.car_model?.brand?.name + ' ' + car?.car_model?.name}
                </li>
                <li className="breadcrumb-item"><Link to={`/cars/${car?.id}/edit`}>Edit</Link></li>
            </ol>
        </nav>

        <Car car={car} deleteCar={deleteCarHandler}/>
    </div>)
}

export default CarsSingleView