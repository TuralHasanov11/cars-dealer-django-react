import { useContext, useEffect, useState} from 'react'
import {Outlet, Link, useParams, useSearchParams} from 'react-router-dom'
import AuthContext from '../../store/auth-context'
import UserContext from '../../store/user-context'
import Loading from '../../components/inc/Loading'
import useAxiosPrivate from "../../hooks/useAxiosPrivate"

function User(){

    const {user: authUser, wishlist} = useContext(AuthContext)
    const {user, setUser, setCars} = useContext(UserContext)
    const {userId} = useParams()
    const [loading, setLoading] = useState(true)
    const [searchParams] = useSearchParams()
    const axiosPrivate = useAxiosPrivate()

    useEffect(()=>{
      async function getUserAndCarsHandler(){
        await Promise.all([axiosPrivate.get(`auth/${userId}`), axiosPrivate.get(`auth/${userId}/cars`, {params:Object.fromEntries([...searchParams])})])
            .then(responses=>{
                setUser(responses[0].data)
                setCars(responses[1].data)
            })
            .catch(errors => {
                return errors
            });
      }
      
      getUserAndCarsHandler()
      setLoading(false)

      return function cleanup() {}
    },[userId])

    useEffect(()=>{
      async function getCarsHandler(){
        await Promise.all([axiosPrivate.get(`auth/${userId}/cars`, {params:Object.fromEntries([...searchParams])})])
            .then(responses=>{
                setCars(responses[0].data)
            })
            .catch(errors => {
                return errors
            });
      }
      
      getCarsHandler()
      setLoading(false)

      return function cleanup() {}
    },[searchParams])

    return loading?<Loading />:<div className="container pt-5 pb-lg-4 mt-5 mb-sm-2">
    <div className="row">
      <aside className="col-lg-4 col-md-5 pe-xl-4 mb-5">
        <div className="card card-body card-light border-0 shadow-sm pb-1 me-lg-1">
          <div className="d-flex d-md-block d-lg-flex align-items-start pt-lg-2 mb-4">
            <div className="pt-md-2 pt-lg-0 ps-3 ps-md-0 ps-lg-3">
              <h2 className="fs-lg text-light mb-0">{user?.username}</h2>
              <ul className="list-unstyled fs-sm mt-3 mb-0">
                <li><div className="nav-link-light fw-normal"><i className="fi-phone opacity-60 me-2"></i>{user?.account_profile?.phone}</div></li>
                {user?.id === authUser?.id && ( <li><a className="nav-link-light fw-normal" href={`mailto:${authUser?.email}`}><i className="fi-mail opacity-60 me-2"></i>{authUser?.email}</a></li>)}
              </ul>
            </div>
          </div>
            {user?.id === authUser?.id &&(<Link className="btn btn-primary btn-lg w-100 mb-3" to="/cars/create">
              <i className="fi-plus me-2"></i>Create a car
            </Link>)}
            
            <a className="btn btn-outline-light d-block d-md-none w-100 mb-3" href="#account-nav" data-bs-toggle="collapse">
              <i className="fi-align-justify me-2"></i>Menu
            </a>
            <div className="collapse d-md-block mt-3" id="account-nav">
              <div className="card-nav">
                  {(user?.id === authUser?.id) && <>
                    <Link className="card-nav-link"  to={`/user/${userId}`}>
                      <i className="fi-user me-2"></i>Personal Info
                  </Link>
                  <Link className="card-nav-link" to={`/user/${userId}/password-security`}>
                      <i className="fi-lock me-2"></i>Password &amp; Security
                  </Link>
                  
                  <Link className="card-nav-link" to={`/user/${userId}/wishlist`}>
                      <i className="fi-heart me-2"></i>Wishlist<span className="badge bg-faded-light ms-2">{wishlist?.length}</span>
                  </Link>
                  </>}
                  <Link className="card-nav-link" to={`/user/${userId}/cars`}>
                      <i className="fi-car me-2"></i>Cars
                  </Link>
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