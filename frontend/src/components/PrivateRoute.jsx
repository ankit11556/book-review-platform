import { Outlet,Navigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

const PrivateRoute = () =>{
  const {loading,user} = useAuth()
 
  if (loading) return <p>Loading...</p>

  return user ? <Outlet/> : <Navigate to="/login"/>
}

export default PrivateRoute