import PropTypes from 'prop-types';
import CarHorizontalCard from "../ui/cards/CarHorizontal";

function Cars({cars, user}){

    return cars.map((car, index)=>(
       <CarHorizontalCard car={car} key={index}/>
    ))
        
}

export default Cars;

Cars.defaultProps = {
    cars: [],
    user:{},
}
  
Cars.propTypes={
    cars: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,

}