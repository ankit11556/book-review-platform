import { Routes,Route} from "react-router-dom";
import Signup from "../pages/SignupPage";
import Login from "../pages/LoginPage";
const AppRoutes = () =>{
  return(
    <Routes>
      <Route path="/signup" element={<Signup/>}></Route>
       <Route path="/login" element={<Login/>}></Route>
    </Routes>
  )
}

export default AppRoutes