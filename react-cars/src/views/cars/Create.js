import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import CarCreateForm from '../../components/cars/CreateForm'
import ItemsContext from "../../store/items-context";
import Loading from "../../components/inc/Loading";

function CarsCreateView(){

    const navigate = useNavigate()
    const itemsCtx = useContext(ItemsContext)
    const [loading, setLoading] = useState(true)


    useEffect(()=>{
        async function getCarItems(){
            await itemsCtx.getItems()
        }

        getCarItems()
        setLoading(false)

        return function cleanup() {}
    },[])

    function onCreateCar(car){
        navigate(`/cars/${car.id}`);
    }

    return (loading?<Loading/>:<div className="container mt-5 mb-md-4 py-5">
    <div className="row">
        <div className="col-lg-10">
            <nav className="mb-3 pt-md-3" aria-label="Breadcrumb">
                <ol className="breadcrumb breadcrumb-light">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Sell car</li>
                </ol>
            </nav>
            <div className="mb-4">
                <h1 className="h2 text-light mb-0">Sell car</h1>
            </div>
            <CarCreateForm 
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
                createCar={onCreateCar}
            />
            </div>
        </div>
    </div>)
}

export default CarsCreateView