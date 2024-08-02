import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { useBlog } from "../hooks";
import { BlogPageSkeleton } from "../skeletons/BlogPageSkeleton";
import { RichTextEditor } from "../components/RichTextEditor";

export const UpdateBlog = () => {
     const { id } = useParams();
     const navigate = useNavigate();
     const [title, setTitle] = useState("");
     const [content, setContent] = useState("");
     const { blog } = useBlog({ id: id || "" });

     useEffect(() => {
          if (blog) {
               setTitle(blog.title);
               setContent(blog.content);
          }
     }, [blog])
          
     function handleChange(content: any) {
          setContent(content)
     }
     async function handleSubmit() {
          try {
               await axios.put(`${BACKEND_URL}/api/v1/blog/${id}`, {
                    title,
                    content
               },{
                    headers: {
                         Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
               });
               navigate(`/profile`)
          } catch (e) {
               console.log("Error while publish", e)
          }
     }

     if (!blog) {
          return <BlogPageSkeleton />
     }

     return (
     <div>
          <div className="flex justify-center w-full">
          <div className="max-w-screen-lg w-full">
               <input
               type="text"
               value={title}
               onChange={(e) => {
               setTitle(e.target.value);
               }}
               className="border w-full py-1 px-2 mt-10 my-2 focus:outline-none"
               />
               <RichTextEditor content={content} onChange={handleChange} />
               <button 
               onClick={handleSubmit}
               type="submit"
               className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:ring-blue-800 font-medium rounded text-sm px-5 py-2.5 mt-12 focus:outline-none">
               Update blog
               </button>
          </div>
          </div>
     </div>
     );
};
