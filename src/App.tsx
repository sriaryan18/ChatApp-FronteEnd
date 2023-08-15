import { BrowserRouter, Route, Routes } from "react-router-dom"
import Root from "./routes/root"
import Homepage from "./routes/Homepage"
import AppProvider from "./AppContext"
import ProtectedRoutes from "./HOC/ProtectedRoutes"


function App() {

 
  return(
    <>
     <AppProvider>
      <Routes>
          <Route path="/" element={<Root/>}/> 
          <Route path="homepage" element ={<ProtectedRoutes Component={Homepage} props={""}/>}></Route>
          
      </Routes>
     </AppProvider>
    
    </>
  )
}

export default App
