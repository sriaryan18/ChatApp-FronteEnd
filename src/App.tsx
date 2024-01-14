import { Route, Routes } from "react-router-dom"
import ProtectedRoutes from "./HOC/ProtectedRoutes"
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import authReducer from './slices/authSlice';
import messageReducer from './slices/messageSlice';
import connectionReducer from './slices/connectionSlice'
import React from "react";

const Login:any = React.lazy(()=>import('./containers/Login/index'));
const HomePage = React.lazy(() => import('./containers/HomePage/index'))

const store = configureStore(({
    reducer:{
        auth: authReducer,
        message: messageReducer,
        connection: connectionReducer
    },

}))
function App() {
  return(
    <>
     <Provider store={store} >
      <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="homepage" element ={<ProtectedRoutes Component={HomePage}/>}></Route>
      </Routes>
     </Provider>
    
    </>
  )
}

export default App
