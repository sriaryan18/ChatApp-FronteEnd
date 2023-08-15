import { BrowserRouter, Route, Routes } from "react-router-dom"
import Root from "./routes/root"
import Homepage from "./routes/Homepage"
import AppProvider, { AppContext } from "./AppContext"


function App() {
  return(
    <>
     <AppProvider>
      <Routes>
          <Route path="/" element={<Root/>}/> 
          <Route path="homepage" element ={<Homepage/>}></Route>
      </Routes>
     </AppProvider>
    
    </>
  )
}

export default App
