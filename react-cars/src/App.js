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
import { useContext, useEffect } from 'react';
import AuthContext from './store/auth-context';

function App() {

  const authCtx = useContext(AuthContext)

  useEffect(()=>{
    authCtx.getUser()
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
        <Route path="/user" element={<User />}>
          <Route element={<AuthMiddleware />}>
            <Route index element={<Profile />} />
            <Route path="password-security" element={<Password /> } />
            <Route path="wishlist" element={<Wishlist />} />
          </Route>
          <Route path=":userId/cars" exact element={<UserCars />} />
        </Route>
        <Route path='*' element={<Navigate to='/' />}></Route>
    </Routes>
  </Default>
</>
}

export default App;
