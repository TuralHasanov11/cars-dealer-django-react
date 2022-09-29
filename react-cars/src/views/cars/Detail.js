import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import CarsContext from '../../store/cars-context'
import Car from '../../components/cars/Single'
import Loading from '../../components/inc/Loading'

function CarsSingleView(){

    const {id} = useParams()
    const {getCar, car} = useContext(CarsContext)
    const [loading, setLoading] = useState(true)

    
    useEffect(()=>{        
        async function getCarDetail(id){
            await getCar(id)
        }

        getCarDetail(id)
        setLoading(false)

        return function cleanup() {}
    },[id])

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

        <Car car={car}/>
    </div>)
}

export default CarsSingleView