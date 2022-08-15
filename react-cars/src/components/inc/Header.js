import { useContext, useState } from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import AuthContext from '../../store/auth-context'


function Header(){

    const authCtx = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function logout(){
        setLoading(true)
        await authCtx.logout().then(()=>{
            setLoading(false)
            document.location.replace('/')
        })
    }

    return (
        <header className="navbar navbar-expand-lg navbar-dark fixed-top navbar-stuck" data-scroll-header>
            <div className="container">
                <NavLink className="navbar-brand me-3 me-xl-4" to="/"><img className="d-block" src="/assets/img/logo/logo-light.svg" width="116" alt="Finder" /></NavLink>
                <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <NavLink className="btn btn-primary btn-sm ms-2 order-lg-3" to="/cars/create"><i className="fi-plus me-2"></i>Sell car</NavLink>
                {authCtx.isAuth?<>
                    <div className="dropdown d-none d-lg-block order-lg-3 my-n2 me-3 mx-2">
                        <NavLink className="d-block py-2" to="/user/profile">
                            {authCtx.user.username}
                        </NavLink>
                        <div className="dropdown-menu dropdown-menu-dark dropdown-menu-end">
                            <div className="d-flex align-items-start border-bottom border-light px-3 py-1 mb-2" style={{'width': '16rem'}}>
                                <div className="ps-2">
                                    <h6 className="fs-base text-light mb-0">{authCtx.user.username}</h6>
                                    <div className="fs-xs py-2">{authCtx.user?.profile_user?.phone}<br/>{authCtx.user.email}</div>
                                </div>
                            </div>
                            <NavLink className={({ isActive }) => (isActive ? 'dropdown-item active' : 'dropdown-item inactive')} to="/user/profile"><i className="fi-user me-2"></i>Personal Info</NavLink>
                            <NavLink className={({ isActive }) => (isActive ? 'dropdown-item active' : 'dropdown-item inactive')} to="/user/password-security"><i className="fi-lock me-2"></i>Password &amp; Security</NavLink>
                            <NavLink className={({ isActive }) => (isActive ? 'dropdown-item active' : 'dropdown-item inactive')} to={`/user/${authCtx.id}/cars`}><i className="fi-car me-2"></i>My Cars</NavLink>
                            <NavLink className={({ isActive }) => (isActive ? 'dropdown-item active' : 'dropdown-item inactive')} to="/user/wishlist"><i className="fi-heart me-2"></i>Wishlist<span className="badge bg-faded-light ms-2">4</span></NavLink>
                            <div className="dropdown-divider"></div>
                            <div className="dropdown-item" onClick={logout}><button disabled={loading} className='btn btn-primary btn-sm ms-2'><i className="fi-logout me-2"></i> Sign Out</button></div>
                        </div>
                    </div>
                </>:<>
                    <a className="btn btn-link btn-light btn-sm d-none d-lg-block order-lg-3" href="#signin-modal" data-bs-toggle="modal"><i className="fi-user me-2"></i>Sign in</a>
                </>}

                <div className="collapse navbar-collapse order-lg-2" id="navbarNav">
                    <ul className="navbar-nav navbar-nav-scroll" style={{'maxHeight':'35rem'}}>
                        <li className="nav-item"><NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link inactive')} to='/'>Home</NavLink></li>
                        <li className="nav-item"><NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link inactive')} to='/cars'>Cars</NavLink></li>
                        {authCtx.isAuth?<>
                            <li className="nav-item dropdown d-lg-none mx-2">
                                <a className="nav-link dropdown-toggle d-flex align-items-center" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {authCtx.user.username}
                                </a>
                                <div className="dropdown-menu dropdown-menu-dark">
                                    <div className="ps-3">
                                        <div className="fs-xs py-2">{authCtx.user?.profile_user?.phone}<br/>{authCtx.user.email}</div>
                                    </div>
                                    <NavLink className={({ isActive }) => (isActive ? 'dropdown-item active' : 'dropdown-item inactive')} to="/user/profile"><i className="fi-user me-2"></i>Personal Info</NavLink>
                                    <NavLink className={({ isActive }) => (isActive ? 'dropdown-item active' : 'dropdown-item inactive')} to="/user/password-security"><i className="fi-lock me-2"></i>Password &amp; Security</NavLink>
                                    <NavLink className={({ isActive }) => (isActive ? 'dropdown-item active' : 'dropdown-item inactive')} to={`/user/${authCtx.id}/cars`}><i className="fi-car me-2"></i>My Cars</NavLink>
                                    <NavLink className={({ isActive }) => (isActive ? 'dropdown-item active' : 'dropdown-item inactive')} to="/user/wishlist"><i className="fi-heart me-2"></i>Wishlist<span className="badge bg-faded-light ms-2">4</span></NavLink>
                                    <div className="dropdown-divider"></div>
                                    <div className="dropdown-item" onClick={logout}><button disabled={loading} className='btn btn-primary btn-sm ms-2'><i className="fi-logout me-2"></i> Sign Out</button></div>
                                </div>
                            </li>
                        </>:<>                        
                            <li className="nav-item d-lg-none"><a className="nav-link" href="#signin-modal" data-bs-toggle="modal"><i className="fi-user me-2"></i>Sign in</a></li>
                        </>}
                        
                    </ul>
                </div>
            </div>
      </header>
    )
}

export default Header