import CarHorizontalCard from "../ui/cards/CarHorizontal"
import PropTypes from 'prop-types';
import CarVerticalCard from "../ui/cards/CarVertical";


function Cars({cars, searchParams}){
    return (
      searchParams.get("is_list")?
      (cars.map((car, index)=>(<CarHorizontalCard key={index} car={car}/>)))
        :
        (<div className="row">
           {cars.map((car, index)=>( <div className="col-sm-6 mb-4" key={index}>
              <CarVerticalCard car={car}/>
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
