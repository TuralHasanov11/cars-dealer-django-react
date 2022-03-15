import { Link } from "react-router-dom"
import PropTypes from 'prop-types';

function PopularCarBodyTypes({carBodies}){
    return (
      <section className="container pb-5 mb-md-4">
        <div className="d-sm-flex align-items-center justify-content-between mb-3 mb-sm-4 pb-sm-2">
          <h2 className="h3 text-light mb-2 mb-sm-0">Popular car body types</h2>
        </div>
        <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-2 g-md-4">
          
          {carBodies.map((body, index)=>(
            <div className="col" key={index}>
              <div className="card card-body card-light card-hover bg-transparent border-0 px-0 pt-0 text-center">
                <img className="d-block mx-auto mb-3" src="/assets/img/car-finder/icons/sedan.svg" width="160" alt={body.name}/>
                <Link className="nav-link-light stretched-link fw-bold" to={`/cars?car_body=${body.id}`}>{body.name}</Link> 
              </div>
            </div>
          ))}
          
          
        </div>
      </section>
    )
}

export default PopularCarBodyTypes

PopularCarBodyTypes.defaultProps = {
  carBodies: [],
}

PopularCarBodyTypes.propTypes={
  carBodies: PropTypes.array.isRequired,
}