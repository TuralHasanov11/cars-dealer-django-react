import { useContext, useEffect } from 'react'
import {Routes, Navigate, Route, Outlet, Link, useParams, useSearchParams, useLocation} from 'react-router-dom'
import Loading from '../../components/inc/Loading'
import AuthContext from '../../store/auth-context'
import MainContext from '../../store/main-context'
import UserContext from '../../store/user-context'


function User(){

    const authCtx = useContext(AuthContext)
    const mainCtx = useContext(MainContext)
    const userCtx = useContext(UserContext)
    const {userId} = useParams()
    const [searchParams] = useSearchParams()


    function logout(e){
      e.preventDefault()
    }

    useEffect(async()=>{
      if(userId!=undefined){
        mainCtx.fetchLoadingToggle()
        userCtx.getUserAndCars(userId, Object.fromEntries([...searchParams]))
        mainCtx.fetchLoadingToggle(false)
      }
    },[userId, searchParams])

    return mainCtx.fetchLoading?<Loading/>:<div className="container pt-5 pb-lg-4 mt-5 mb-sm-2">
    <nav className="mb-4 pt-md-3" aria-label="Breadcrumb">
      <ol className="breadcrumb breadcrumb-light">
        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
        <li className="breadcrumb-item"><Link to="/user">Account</Link></li>
        <li className="breadcrumb-item active" aria-current="page">Personal Info</li>
      </ol>
    </nav>
    <div className="row">
      <aside className="col-lg-4 col-md-5 pe-xl-4 mb-5">
        <div className="card card-body card-light border-0 shadow-sm pb-1 me-lg-1">
          <div className="d-flex d-md-block d-lg-flex align-items-start pt-lg-2 mb-4">
            <div className="pt-md-2 pt-lg-0 ps-3 ps-md-0 ps-lg-3">
              <h2 className="fs-lg text-light mb-0">{userCtx.user?.username}</h2>
              <ul className="list-unstyled fs-sm mt-3 mb-0">
                <li><div className="nav-link-light fw-normal"><i className="fi-phone opacity-60 me-2"></i>{userCtx.user?.profile_user?.phone}</div></li>
                {userId == authCtx.id?( <li><a className="nav-link-light fw-normal" href={`mailto:${authCtx.user.email}`}><i className="fi-mail opacity-60 me-2"></i>{authCtx.user.email}</a></li>):''}
              </ul>
            </div>
          </div>
            {!userId || (userId == authCtx.id)?(<Link className="btn btn-primary btn-lg w-100 mb-3" to="/cars/create">
              <i className="fi-plus me-2"></i>Create a car
            </Link>):''}
            
            <a className="btn btn-outline-light d-block d-md-none w-100 mb-3" href="#account-nav" data-bs-toggle="collapse">
              <i className="fi-align-justify me-2"></i>Menu
            </a>
            <div className="collapse d-md-block mt-3" id="account-nav">
              <div className="card-nav">
                  <Link className="card-nav-link" to={`/user/${userCtx.user?.id}/cars`}>
                      <i className="fi-car me-2"></i>Cars
                  </Link>
                  {!userId || (userId == authCtx.id)?<>
                    <Link className="card-nav-link"  to="/user/profile">
                      <i className="fi-user me-2"></i>Personal Info
                  </Link>
                  <Link className="card-nav-link" to="/user/password-security">
                      <i className="fi-lock me-2"></i>Password &amp; Security
                  </Link>
                  
                  <Link className="card-nav-link" to="/user/wishlist">
                      <i className="fi-heart me-2"></i>Wishlist<span className="badge bg-faded-light ms-2">{authCtx.wishlist?.length}</span>
                  </Link>
                  <a className="card-nav-link" onClick={logout}>
                      <i className="fi-logout me-2"></i>Sign Out
                  </a>
                  </>:''}
              </div>
            </div>
        </div>
      </aside>
      <div className="col-lg-8 col-md-7 mb-5">
        <Outlet />
      </div>
    </div>
  </div>
}

export default User