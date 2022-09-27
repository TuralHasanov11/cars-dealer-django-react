import Default from './layouts/Default';
import {Routes, Navigate, Route} from 'react-router-dom'

import HomeView from './views/HomeView';

import CarsView from './views/cars/CarsIndexView'
import CarView from './views/cars/CarsSingleView'
import CarCreateView from './views/cars/CarsCreateView';
import CarEditView from './views/cars/CarsEditView';

import User from './views/auth/User'
import Profile from './views/auth/Profile'
import Password from './views/auth/Password'
import UserCars from './views/auth/UserCarsView'
import Wishlist from './views/auth/Wishlist'
import AuthMiddleware from './middleware/AuthMiddleware'
import { useEffect } from 'react';
import useUser from './hooks/useUser';
import Checkout from './views/Payment/Checkout';

function App() {

  const getUser = useUser()

  useEffect(()=>{
    
    const controller = new AbortController();
        
    async function autoLogin(){
      try {
          getUser()
      } catch (error) {
          console.log(error.response)
      }
    }

    autoLogin();

    return () => {
      controller.abort();
    }
  }, [])
  
  return <>
  <Default>
    <Routes>
        <Route path='/' exact element={ <HomeView />}></Route>
        <Route path="/cars">
          <Route path='' exact element={ <CarsView />}></Route>
          <Route path=':id' exact element={ <CarView />}></Route>
          <Route element={<AuthMiddleware />}>
            <Route path='create' exact element={ <CarCreateView /> }></Route>
            <Route path=':id/edit' exact element={ <CarEditView /> }></Route>
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
</>
}

export default App;
