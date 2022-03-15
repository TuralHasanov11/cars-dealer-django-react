import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import CarsContext from '../../store/cars-context'
import CarCreateForm from '../../components/cars/CreateForm'
// import Message from "../../inc/Message";
import ItemsContext from "../../store/items-context";
import MainContext from "../../store/main-context";
import Loading from "../../components/inc/Loading";
import { Message } from "../../components/inc/Message";
import AuthContext from "../../store/auth-context";
import MessagesContext from '../../store/messages-context'

function CarsCreateView(){

    const navigate = useNavigate()
    const mainCtx = useContext(MainContext)
    const carsCtx = useContext(CarsContext)
    const itemsCtx = useContext(ItemsContext)
    const authCtx = useContext(AuthContext)
    const messagesContext = useContext(MessagesContext)

    useEffect(async ()=>{

        mainCtx.fetchLoadingToggle()
        await Promise.all([
            itemsCtx.getBrands(),
            itemsCtx.getCities(),
            itemsCtx.getColors(),
            itemsCtx.getCarBodies(),
            itemsCtx.getEngines(),
            itemsCtx.getEquipment(),
            itemsCtx.getGearLevers(),
            itemsCtx.getTransmissions(),
            itemsCtx.getFuels(),
        ]).then(()=>{
            mainCtx.fetchLoadingToggle(false)
        })

        return function cleanup() {
            mainCtx.fetchLoadingToggle()
        }
    },[])

    function onCreateCar(data){
        console.log(data)
        // messagesContext.setMessage({})
        // navigate(`/user/${authCtx.id}/cars`);
    }

    if(mainCtx.fetchLoading){
        return <Loading/>
    }

    return <>
        <div className="container mt-5 mb-md-4 py-5">
            <div className="row">
                <div className="col-lg-8">
                    <nav className="mb-3 pt-md-3" aria-label="Breadcrumb">
                        <ol className="breadcrumb breadcrumb-light">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Sell car</li>
                        </ol>
                    </nav>
                    <div className="mb-4">
                        <h1 className="h2 text-light mb-0">Sell car</h1>
                    </div>

                    <div className="mb-4">
                        {/* <Message message={message} setMessage={setMessage}/> */}
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
        </div>
    </>
}

export default CarsCreateView