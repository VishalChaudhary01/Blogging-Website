import { Link } from "react-router-dom";
import { useBlogs } from "../hooks"
import { BlogPageSkeleton } from "../skeletons/BlogPageSkeleton";

export const UserBlogs = ({ userId }: { userId: number }) => {
     const { blogs, loading } = useBlogs();

     if (loading) {
          return <BlogPageSkeleton />
     }
     const userPosts = blogs.filter(blog => blog.authorId === userId)

     return (
          <div>
          {userPosts.length === 0 ? (
               <div className="py-2 flex justify-center text-xl text-red-700">You don't have posted any blog</div>
          ) : (
               <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                         <tr>
                              <th scope="col" className="px-6 py-3">
                                   Blog Title
                              </th>
                              <th scope="col" className="px-6 py-3">
                                   Date
                              </th>
                              <th scope="col" className="px-6 py-3">
                                   <span className="sr-only">Update</span>
                              </th>
                              <th scope="col" className="px-6 py-3">
                                   <span className="sr-only">Delete</span>
                              </th>
                         </tr>
                    </thead>
                    
                    {userPosts.map((blog) => (
                         <tbody key={blog.id}>
                              <tr className="bg-white border-b hover:bg-gray-50">
                                   <th scope="row" className="px-6 col-span-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                        <Link to={`/blog/${blog.id}`}>
                                             {blog.title.slice(0, 80) + (blog.title.length > 80 ? "..." : "")}
                                        </Link>
                                   </th>
                                   <td className="px-6 py-4">
                                        {blog.publishDate.split('T')[0]}
                                   </td>
                                   <td className="px-6 py-4 text-right">
                                        <Link to={`/blog/update/${blog.id}`} className="font-medium text-blue-600 hover:underline">Update</Link>
                                   </td>
                                   <td className="px-6 py-4 text-right">
                                        <Link to={`/blog/delete/${blog.id}`} className="font-medium text-red-600 hover:underline">Delete</Link>
                                   </td>
                              </tr>
                         </tbody>
                    ))}
               </table>
          )}
          </div>
     )
}