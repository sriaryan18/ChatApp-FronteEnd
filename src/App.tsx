import { BrowserRouter, Route, Routes } from "react-router-dom"
import Root from "./routes/root"


function App() {
  return(
    <>
     
     <Routes>
        <Route path="/" element={<Root/>}/> 
     </Routes>
    
    </>
  )
}

export default App
