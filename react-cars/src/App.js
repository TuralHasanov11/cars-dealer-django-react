import Default from './layouts/Default';
import {Routes, Navigate, Route} from 'react-router-dom'

import HomeView from './views/Home';

import CarsView from './views/cars/Index'
import CarsSingleView from './views/cars/Detail'
import CarsCreateView from './views/cars/Create';
import CarsEditView from './views/cars/Edit';

import User from './views/auth/User'
import Profile from './views/auth/Profile'
import Password from './views/auth/Password'
import UserCars from './views/auth/UserCars'
import Wishlist from './views/auth/Wishlist'
import AuthMiddleware from './middleware/Auth'
import { useEffect, useState } from 'react';
import useUser from './hooks/useUser';
import Checkout from './views/Payment/Checkout';
import Loading from './components/inc/Loading';

function App() {

  const getUser = useUser()
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    
    const controller = new AbortController();
        
    async function autoLogin(){
      setLoading(true)
      try {
          await getUser()
          setLoading(false)
      } catch (error) {
          console.log(error.response)
          setLoading(false)
      }
    }

    autoLogin();

    return () => {
      controller.abort();
    }
  }, [])
  
  return (loading?<Loading />:<>
    <Default>
      <Routes>
          <Route path='/' exact element={ <HomeView />}></Route>
          <Route path="/cars">
            <Route path='' exact element={ <CarsView />}></Route>
            <Route path=':id' exact element={ <CarsSingleView />}></Route>
            <Route element={<AuthMiddleware />}>
              <Route path='create' exact element={ <CarsCreateView /> }></Route>
              <Route path=':id/edit' exact element={ <CarsEditView /> }></Route>
            </Route>
          </Route>
          <Route path="/user/:userId" element={<User />}>
            <Route element={<AuthMiddleware />}>
              <Route index element={<Profile />} />
              <Route path="password-security" element={<Password /> } />
              <Route path="wishlist" element={<Wishlist />} />
            </Route>
            <Route path="cars" exact element={<UserCars />} />
          </Route>
          <Route element={<AuthMiddleware />}>
            <Route path="checkout" element={<Checkout /> } />
          </Route>
          <Route path='*' element={<Navigate to='/' />}></Route>
      </Routes>
    </Default>
  </>)
}

export default App;
