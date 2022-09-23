import { Link } from "react-router-dom"
import PropTypes from 'prop-types';
import { useContext } from "react";
import CarsContext from '../store/cars-context'


function Brands({brands}){

    const {filterData, setFilterData} = useContext(CarsContext)


    return (
    <section className="container py-2 py-sm-3">
        <div className="row g-2 g-sm-4">
            {brands.map((brand, index)=>(
                <div className="col-3 col-sm-2 col-xl-1 mb-4 pb-2" key={index}>
                    <Link onClick={()=>(setFilterData({...filterData, brand:brand.id}))} className="opacity-40 opacity-transition d-table mx-auto" to={`cars?brand=${brand.id}`}>
                        <img src="/assets/img/car-finder/brands/opel.svg" width="86" alt={brand.name}/>
                    </Link>
                </div>
            ))}
        </div>
    </section>
    )
}

export default Brands

Brands.defaultProps = {
    brands: [],
}
  
Brands.propTypes={
    brands: PropTypes.array.isRequired,
}