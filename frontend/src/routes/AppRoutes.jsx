import { Routes,Route} from "react-router-dom";
import Signup from "../pages/SignupPage";
import Login from "../pages/LoginPage";
import Home from "../pages/HomePage";
const AppRoutes = () =>{
  return(
    <Routes>
      <Route path="/signup" element={<Signup/>}></Route>
       <Route path="/login" element={<Login/>}></Route>

       <Route path="/" element={<Home/>}></Route>
    </Routes>
  )
}

export default AppRoutes