import PropTypes from 'prop-types';
import CarVerticalCard from '../ui/cards/CarVertical';

function LatestCars({cars}){
    
    return (
        <section className="container pt-sm-5 pt-4 pb-3">
        <div className="d-sm-flex align-items-center justify-content-between mb-3 mb-sm-4 pb-2">
          <h2 className="h3 text-light mb-3 mb-sm-0">Latest cars</h2>
        </div>
        <div className="row">
            {cars.map((car, index)=>(<div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={index}>
                <CarVerticalCard car={car}/>
            </div>))}
        </div>
      </section>

        
    )
}

export default LatestCars

LatestCars.defaultProps = {
    cars: [],
}
  
LatestCars.propTypes={
    cars: PropTypes.array.isRequired,
}