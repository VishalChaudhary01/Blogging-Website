import { useNavigate } from "react-router-dom";
import { useUserInfo } from "../hooks";
import { Avatar } from "./Avatar"
import { UserBlogs } from "./UserBlogs";

export const Profile = () => {
     const navigate = useNavigate();
     const { userInfo, loading } = useUserInfo();

     if (loading || !userInfo) {
          return <div>Loading.....</div>
     }

     const handleLogout = () => {
          localStorage.removeItem("token");
          navigate("/signin");
          window.location.reload(); 
     }
     
     return (
          <div className="grid grid-cols-5 min-h-screen">
               <div className="bg-slate-100 border pt-10">
                    <div className="flex justify-center">
                         <Avatar name="V" size="big"/>
                    </div>
                    <div className="flex justify-center font-bold text-gray-700">
                         {userInfo.name}
                    </div>
                    <div className="flex justify-center font-sm text-gray-700">
                         {userInfo.email}
                    </div>
                    <div className="flex justify-center p-8 ">
                         <button  onClick={handleLogout} className="w-full bg-gray-700 hover:bg-gray-800 text-white rounded-lg py-2 font-medium" >
                              Logout
                         </button>
                    </div>
               </div>
               <div className="col-span-4 ">
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                         <div className="py-6 text-2xl font-bold border-b text-gray-600 flex justify-center">
                              Your all blogs are here
                         </div>
                         <UserBlogs userId={userInfo.id}/>
                    </div>
               </div>
          </div>
     )
}