import axios from "axios";
import { useState, useEffect } from "react"; 
import { BACKEND_URL } from "../config";

export interface Blog {
     "id": number;
     "title": string;
     "content": string;
     "authorId": number;
     "author": {
          "name": string
     }
     "publishDate": string
}

export interface User {
     "id": number;
     "name": string;
     "email": string;
}

export const useUserInfo = () => {
     const [loading, setLoading] = useState(true);
     const [userInfo, setUserInfo] = useState<User>();
     useEffect (() => {
          const fetchUser = async () => {
               try {
                    const response = await axios.get(`http://127.0.0.1:8787/api/v1/user/profile`, {
                         headers: {
                              Authorization: `Bearer ${localStorage.getItem("token")}`
                         }
                    })
                    setUserInfo(response.data);
               } catch (e) {
                    console.error("Something went wrong:", e);
               } finally {
                    setLoading(false);
               }    
          }
          fetchUser();
     }, []);
     return {
          userInfo,
          loading
     }
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