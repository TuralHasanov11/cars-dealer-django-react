import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'

import './index.css';


import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthContextProvider } from './store/auth-context';
import { ItemsContextProvider } from './store/items-context';
import { CarsContextProvider } from './store/cars-context';
import { UserContextProvider } from './store/user-context';
import {MessagesContextProvider} from './store/messages-context'

ReactDOM.render(
    <AuthContextProvider>
    <ItemsContextProvider>
      <CarsContextProvider>
        <UserContextProvider>
          <MessagesContextProvider>

            <React.StrictMode>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </React.StrictMode>

          </MessagesContextProvider>
        </UserContextProvider>      
      </CarsContextProvider>
    </ItemsContextProvider>
  </AuthContextProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
