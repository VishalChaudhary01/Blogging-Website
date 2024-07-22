import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";
import { useUserInfo } from "../hooks";
import { useEffect } from "react";

export const Appbar = () => {
     const { userInfo } = useUserInfo();
     const token = localStorage.getItem("token");

     useEffect(() => {
          console.log(userInfo)
     }, [userInfo, token])

     return (
          <div className="py-2 px-10 border-b border-gray-200 flex justify-between">
               <Link to={`/`} className="font-extrabold text-2xl text-gray-700 flex flex-col justify-center cursor-pointer">
                    Bloggin-App
               </Link>
               { userInfo ? (
                    <div className="flex justify-center">
                         <Link to={`/publish`} className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">Post new Blog</Link>
                         <Link to={'/profile'}>
                              <Avatar name={userInfo.name} size="big" />
                         </Link>
                    </div>
               ) : (
                    <div className="flex justify-center">
                         <Link to={`/signin`} className="mr-4 text-white bg-gray-700 hover:bg-gray-800 focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">Signin</Link>
                         <Link to={`/signup`} className="mr-4 text-white bg-gray-700 hover:bg-gray-800 focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">Signup</Link>
                    </div>
               )}
          </div>
     )
}