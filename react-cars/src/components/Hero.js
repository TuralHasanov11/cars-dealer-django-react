import React from 'react';

export default function Hero() {
  return <section className="bg-top-center bg-repeat-0 pt-5" style={{'backgroundImage':'url(/assets/img/car-finder/home/hero-bg.png)', 'backgroundSize':'1920px 630px'}}>
    <div className="container pt-5">
        <div className="row pt-lg-4 pt-xl-5">
            <div className="col-lg-4 col-md-5 pt-3 pt-md-4 pt-lg-5">
                <h1 className="display-4 text-light pb-2 mb-4 me-md-n5">Easy way to find the right car</h1>
                <p className="fs-lg text-light opacity-70">Finder is a leading digital marketplace for the automotive industry that connects car shoppers with sellers. </p>
            </div>
            <div className="col-lg-8 col-md-7 pt-md-5"><img className="d-block mt-4 ms-auto" src="/assets/img/car-finder/home/hero-img.png" width="800" alt="Car"/></div>
        </div>
    </div>
  </section>;
}
