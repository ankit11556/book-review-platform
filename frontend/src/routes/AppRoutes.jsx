import { Routes,Route} from "react-router-dom";
import Signup from "../pages/SignupPage";
import Login from "../pages/LoginPage";
import Home from "../pages/HomePage";
import AddBook from "../pages/AddBookPage";
import BookDetails from "../pages/BookDetailsPage";
import PrivateRoute from "../components/PrivateRoute";
const AppRoutes = () =>{
  return(
    <Routes>
      <Route path="/signup" element={<Signup/>}></Route>
       <Route path="/login" element={<Login/>}></Route>
       <Route path="/" element={<Home/>}></Route>
       
        <Route element={<PrivateRoute/>}>
       <Route path="add-book" element={<AddBook/>}></Route>
        </Route>
       <Route path="book-detail-page/:id" element={<BookDetails/>}></Route>
    </Routes>
  )
}

export default AppRoutes