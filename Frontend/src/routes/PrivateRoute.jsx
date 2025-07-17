import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
export default function PrivateRoute({children}){
    const {userDetails}=useContext(AuthContext);
    if(!localStorage.getItem("token")){
        return <Navigate to="/login"/>;
    }
    return children;
}