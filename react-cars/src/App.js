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
import { useContext, useEffect } from 'react';
import MainContext from './store/main-context';
import AuthContext from './store/auth-context';
import AuthMiddleware from './middleware/AuthMiddleware'

function App() {

  const authCtx = useContext(AuthContext)
  const mainCtx = useContext(MainContext)
  
  useEffect(async ()=>{
    await authCtx.getUser().then(()=>{
      mainCtx.fetchLoadingToggle(false)
    }).catch(()=>{
      mainCtx.fetchLoadingToggle(false)
    })
  },[])


  return <>
  <Default>
    <Routes>
        <Route path='/' exact element={ <HomeView />}></Route>
        <Route path='/cars' exact element={ <CarsView />}></Route>
        <Route path='/cars/create' exact element={ <AuthMiddleware><CarCreateView /></AuthMiddleware>}></Route>
        <Route path='/cars/:id' exact element={ <CarView />}></Route>
        <Route path='/cars/:id/edit' exact element={ <AuthMiddleware><CarEditView /></AuthMiddleware> }></Route>
        <Route path="/user" element={<User />}>
          <Route index element={<AuthMiddleware><Profile /></AuthMiddleware>} />
          <Route path="profile" element={<AuthMiddleware><Profile /></AuthMiddleware> } />
          <Route path="password-security" element={<AuthMiddleware><Password /></AuthMiddleware> } />
          <Route path="wishlist" element={<AuthMiddleware><Wishlist /></AuthMiddleware>} />
          <Route path=":userId/cars" exact element={<UserCars />} />
        </Route>
        <Route path='*' element={<Navigate to='/' />}></Route>
    </Routes>
  </Default>
</>
}

export default App;
