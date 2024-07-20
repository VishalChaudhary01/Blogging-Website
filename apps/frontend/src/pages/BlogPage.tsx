import { useParams } from "react-router-dom"
import { Appbar } from "../components/Appbar"
import { useBlog } from "../hooks"
import { FullBlog } from "../components/FullBlog";
import { BlogPageSkeleton } from "../skeletons/BlogPageSkeleton";

export const BlogPage = () => {
     const { id } = useParams();
     const { blog, loading } = useBlog({ id: id || "" });
     
     return (
          <>
          <Appbar />
          {loading ? (
               <BlogPageSkeleton />
          ) : null}
          
          {blog ? (
               <FullBlog blog={blog}/>
          ) : null }
               
          </>
     )
}