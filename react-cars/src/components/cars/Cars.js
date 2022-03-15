import { Link, useParams, useSearchParams } from "react-router-dom"
import CarCard from "../ui/cards/CarCard"
import PropTypes from 'prop-types';


function Cars({cars, searchParams}){
    return (
      searchParams.get("is_list")?
      (cars.map((car, index)=>(<CarCard key={index} car={car} isList={true}/>)))
        :
        (<div className="row">
           {cars.map((car, index)=>( <div className="col-sm-6 mb-4" key={index}>
              <CarCard car={car}/>
          </div>))}
        </div>)
    )
}

export default Cars

Cars.defaultProps = {
  cars: [],
}

Cars.propTypes={
  cars: PropTypes.array.isRequired,
}
