import { useNavigate, Outlet } from "react-router-dom";
import { useEffect } from "react";

export const PrivateRoutes = () => {
     const navigate = useNavigate();
     const token = localStorage.getItem("token")

     useEffect(() => {
          if (!token) {
               navigate("/signin")
          }
     })
     return (
          <Outlet />
     )
}
