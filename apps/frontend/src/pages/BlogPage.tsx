import { useParams } from "react-router-dom"
import { useBlog } from "../hooks"
import { FullBlog } from "../components/FullBlog";
import { BlogPageSkeleton } from "../skeletons/BlogPageSkeleton";

export const BlogPage = () => {
     const { id } = useParams();
     const { blog, loading } = useBlog({ id: id || "" });

     if (loading ) {
          return <BlogPageSkeleton />
     }
     
     return (
          <>
               { blog ? (
                    <FullBlog blog={blog}/>  
               ) : null }  
                
          </>
     )
}