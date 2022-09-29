import { Link } from "react-router-dom"

function Features(){
    return (
        <section className="container pt-4 pt-md-5">
            <div className="d-sm-flex align-items-center justify-content-between">
            <h2 className="h3 text-light mb-2 mb-sm-0">What sets Finder apart?</h2><Link className="btn btn-link btn-light fw-normal px-0" to="/cars/create">How to sell cars on Finder<i className="fi-arrow-long-right fs-sm mt-0 ps-1 ms-2"></i></Link>
            </div>
            <div className="row">
            <div className="col-md-5 col-lg-4 offset-lg-1 pt-4 mt-2 pt-md-5 mt-md-3">
                <div className="d-flex pb-4 pb-md-5 mb-2"><i className="fi-file lead text-primary mt-1 order-md-2"></i>
                <div className="text-md-end ps-3 ps-md-0 pe-md-3 order-md-1">
                    <h3 className="h6 text-light mb-1">Over 1 Million Listings</h3>
                    <p className="fs-sm text-light opacity-70 mb-0">That’s more than you’ll find on any other major online automotive marketplace in the USA.</p>
                </div>
                </div>
                <div className="d-flex pb-4 pb-md-5 mb-2"><i className="fi-search lead text-primary mt-1 order-md-2"></i>
                <div className="text-md-end ps-3 ps-md-0 pe-md-3 order-md-1">
                    <h3 className="h6 text-light mb-1">Personalized Search</h3>
                    <p className="fs-sm text-light opacity-70 mb-0">Our powerful search makes it easy to personalize your results so you only see the cars and features you care about.</p>
                </div>
                </div>
                <div className="d-flex pb-4 pb-md-5 mb-2"><i className="fi-settings lead text-primary mt-1 order-md-2"></i>
                <div className="text-md-end ps-3 ps-md-0 pe-md-3 order-md-1">
                    <h3 className="h6 text-light mb-1">Non-Stop Innovation</h3>
                    <p className="fs-sm text-light opacity-70 mb-0">Our team is constantly developing new features that make the process of buying and selling a car simpler.</p>
                </div>
                </div>
            </div>
            <div className="col-md-2 d-none d-md-block">
                <div className="position-relative mx-auto h-100" style={{'maxWidth':'5rem','minHeight': '26rem'}}>
                <div className="content-overlay pt-5" data-jarallax-element="100"><img className="pt-3 mt-5" src="/assets/img/car-finder/home/car.svg" alt="Car"/></div>
                <div className="position-absolute top-0 start-50 translate-middle-x h-100 overflow-hidden"><img src="/assets/img/car-finder/home/road-line.svg" width="2" alt="Road line"/></div>
                </div>
            </div>
            <div className="col-md-5 col-lg-4 pt-md-5 mt-md-3">
                <div className="d-flex pb-4 pb-md-5 mb-2"><i className="fi-info-circle lead text-primary mt-1"></i>
                <div className="ps-3">
                    <h3 className="h6 text-light mb-1">Valuable Insights</h3>
                    <p className="fs-sm text-light opacity-70 mb-0">We provide free access to key info like dealer reviews, market value, price drops.</p>
                </div>
                </div>
                <div className="d-flex pb-4 pb-md-5 mb-2"><i className="fi-users lead text-primary mt-1"></i>
                <div className="ps-3">
                    <h3 className="h6 text-light mb-1">Consumer-First Mentality</h3>
                    <p className="fs-sm text-light opacity-70 mb-0">We focus on building the most transparent, trustworthy experience for our users, and we’ve proven that works for dealers, too.</p>
                </div>
                </div>
                <div className="d-flex pb-4 pb-md-5 mb-2"><i className="fi-calculator lead text-primary mt-1"></i>
                <div className="ps-3">
                    <h3 className="h6 text-light mb-1">Online Car Appraisal</h3>
                    <p className="fs-sm text-light opacity-70 mb-0">Specify the parameters of your car to form its market value on the basis of similar cars on Finder.</p>
                </div>
                </div>
            </div>
            </div>
        </section>
    )
}

export default Features