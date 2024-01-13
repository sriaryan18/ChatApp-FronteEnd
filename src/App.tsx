import { Route, Routes } from "react-router-dom"
import Homepage from "./routes/Homepage"
import ProtectedRoutes from "./HOC/ProtectedRoutes"
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import authReducer from './slices/authSlice';
import React from "react";
import styled from "styled-components";

const Login:any = React.lazy(()=>import('./containers/Login/index'))

const store = configureStore(({
    reducer:{
        auth: authReducer,
    },

}))
function App() {
  return(
    <>
     <Provider store={store} >
      <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="homepage" element ={<ProtectedRoutes Component={Homepage} props={""}/>}></Route>
      </Routes>
     </Provider>
    
    </>
  )
}

export default App
