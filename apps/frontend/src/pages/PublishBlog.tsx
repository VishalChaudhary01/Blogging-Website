import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

export const PublishBlog = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function handleSubmit() {
     try {
          await axios.post(`${BACKEND_URL}/api/v1/blog`, {
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

  return (
    <div>
      <div className="flex justify-center w-full">
        <div className="max-w-screen-lg w-full">
          <input
            type="text"
            placeholder="Title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className="border w-full py-1 px-2 mt-10 my-2 focus:outline-none"
          />
          <textarea
            placeholder="Write content..."
            rows={5}
            onChange={(e) =>{
               setContent(e.target.value)
            }}
            className="w-full border py-1 px-2 focus:outline-none"
            required
          ></textarea>
          <button 
            onClick={handleSubmit}
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:ring-blue-800 font-medium rounded text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none">
            Publish blog
          </button>
        </div>
      </div>
    </div>
  );
};
