import axios from "axios";
import { useState, useEffect } from "react"; 
import { BACKEND_URL } from "../config";

export interface Blog {
     "id": number;
     "title": string;
     "content": string;
     "author": {
          "name": string
     }
     "publishDate": string
}

export const useBlog = ({ id }: { id: string }) => {
     const [loading, setLoading] = useState(true);
     const [blog, setBlog] = useState<Blog>();
     useEffect (() => {
          const fetchBlog = async () => {
               try {
                    const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
                         headers: {
                              Authorization: `Bearer ${localStorage.getItem("token")}`
                         }
                    })
                    setBlog(response.data);
               } catch (e) {
                    alert(e)
                    console.error("Error While fetching blog:", e);
               } finally {
                    setLoading(false);
               }
          }
          fetchBlog();
     }, []);

     return {
          loading,
          blog
     }
} 

export const useBlogs = () => {
     const [loading, setLoading] = useState(true);
     const [blogs, setBlogs] = useState<Blog[]>([]);

     useEffect(() => {
          const fetchBlogs = async () => {
               try {
                    const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
                         headers: {
                              Authorization: `Bearer ${localStorage.getItem("token")}`
                         }
                    });
                    setBlogs(response.data);
               } catch (error) {
                    alert(error)
                    console.error("Error While fetching blogs:", error);
               } finally {
                    setLoading(false);
               }
          };
          fetchBlogs();
     }, []);

     return {
          loading, 
          blogs
     }
}