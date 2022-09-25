import { useContext } from 'react'
import {Link} from 'react-router-dom'
import AuthContext from '../../store/auth-context'

function Footer(){

    const {isAuth, user} = useContext(AuthContext)

    return (
        <footer className="footer bg-faded-light">
            <div className="border-bottom border-light py-4">
                <div className="container d-sm-flex align-items-center justify-content-between"><Link className="d-inline-block" to="/"><img src="/assets/img/logo/logo-light.svg" width="116" alt="logo"/></Link></div>
            </div>
            <div className="container pt-4 pb-3 pt-lg-5 pb-lg-4">
                <div className="row pt-2 pt-lg-0">
                    <div className="col-lg-3 col-md-4 col-sm-6 offset-xl-1 mb-2 mb-sm-4">
                        <h3 className="fs-base text-light">Buying &amp; Selling</h3>
                        <ul className="list-unstyled fs-sm">
                            <li><Link className="nav-link-light" to="/cars">Find a car</Link></li>
                            <li><Link className="nav-link-light" to="/cars/create">Sell your car</Link></li>
                        </ul>
                    </div>
                    {isAuth && <div className="col-lg-3 col-md-4 col-sm-6 mb-2 mb-sm-4">
                        <h3 className="fs-base text-light">Profile</h3>
                        <ul className="list-unstyled fs-sm">
                            <li><Link className="nav-link-light" to={`/user/${user?.id}`}>My account</Link></li>
                            <li><Link className="nav-link-light" to={`/user/${user?.id}/wishlist`}>Wishlist</Link></li>
                        </ul>
                    </div>}
                    <div className="col-xl-2 col-lg-3 col-sm-6 col-md-3 mb-2 mb-sm-4">
                        <div className="d-flex flex-wrap pt-4">
                            <a target="_blank" className="btn btn-icon btn-translucent-light btn-xs rounded-circle mb-2 me-2" href="https://github.com/TuralHasanov11?tab=repositories" rel="noreferrer"><i className="fi-github"></i></a>
                            <a target="_blank" className="btn btn-icon btn-translucent-light btn-xs rounded-circle mb-2 me-2" href="https://www.linkedin.com/in/tural-hasanov-1a5554204/" rel="noreferrer"><i className="fi-linkedin"></i></a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container fs-sm pb-3">
                <p className="text-center order-lg-1 mb-lg-0">
                    <span className="text-light opacity-50">&copy; All rights reserved. Made by </span>
                    <a target="_blank" className="nav-link-light fw-bold" href="https://turalhasanovportfolio.herokuapp.com" rel="noopener noreferrer">Tural Hasanov</a>
                </p>
            </div>
        </footer>
    )
}

export default Footer