import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"
import { BACKEND_URL } from "../config";


export const DeleteBlog = () => {
     const { id } = useParams();
     const navigate = useNavigate();
     
     const handleDelete = async () => {
          try {
               await axios.delete(`${BACKEND_URL}/api/v1/blog/${id}`, {
                    headers: {
                         Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
               });
               navigate(`/profile`)
          } catch (e) {
               console.log(e);
          }
     }
     return (
          <div className="flex justify-center pt-10">
               <div className="w-full max-w-sm p-4 bg-gray-100 border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
                    <div className="text-xl font-medium text-gray-900 text-center">
                         Are you sure, want to delete this blog
                    </div>
                    <button onClick={handleDelete} type="button" className="mt-10 w-full bg-gray-800 hover:bg-gray-900 text-white rounded-lg py-2 font-medium" >
                         Delete Blog
                    </button>
               </div>
          </div>
     )
}