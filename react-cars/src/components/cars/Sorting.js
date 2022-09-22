import { useContext, useState } from "react"
import CarsContext from "../../store/cars-context"

function Sorting(){

    const {filterData, setFilterData} = useContext(CarsContext)

    const [ordering, setOrdering] = useState(filterData.ordering)

    function onOrderChangeHandler(e){
        setOrdering(e.target.value)
        setFilterData({...filterData, ordering:e.target.value})
    }

    return (
        <div className="d-flex align-items-center me-sm-4">
            <label className="fs-sm text-light me-2 pe-1 text-nowrap" htmlFor="carSorting"><i className="fi-arrows-sort mt-n1 me-2"></i>Sort by:</label>
            <select value={ordering} onChange={onOrderChangeHandler} className="form-select form-select-light form-select-sm me-2 me-sm-4" id="carSorting">
                <option value='-created_at'>Newest</option>
                <option value='price'>Price: Low - High</option>
                <option value='-price'>Price: Hight - Low</option>
            </select>
        </div>
    )
}

export default Sorting