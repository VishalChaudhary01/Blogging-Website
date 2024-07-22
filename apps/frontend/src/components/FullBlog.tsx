import { Blog } from "../hooks";
import { Avatar } from "./Avatar";

export const FullBlog = ({ blog }: {blog: Blog}) => {
     return (
          <div className="flex fustify-center">
               <div className="grid grid-cols-3 px-20 pt-20 w-full max-w-screen-2xl">
                    <div className="col-span-2 pr-2">
                         <div>
                              <div className="text-4xl font-bold text-gray-700">
                                   {blog.title}
                              </div>
                              <div className="pt-2 text-gray-500 font-normal">
                                   {blog.publishDate.split('T')[0]}
                              </div>
                              <div className="pt-2">
                                   {blog.content}
                              </div>
                         </div>
                    </div>
                    <div className="pl-2 border-l">
                         <div className="text-gray-500">
                              Author
                         </div>
                         <div className="flex py-2">
                              <div className="pr-2 flex flex-col justify-center">
                                   <Avatar size="small" name={blog.author.name || "Anonymous"}/>
                              </div>
                              <div className="text-xl font-bold text-gray-700">
                                   {blog.author.name || "Anonymous"}
                              </div>
                         </div>
                         <div className="pl-6">
                              This is dummy details of author, Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe quam autem expedita tempora eligendi non consectetur voluptas ab ullam magnam ipsam hic nisi illo recusandae earum, perferendis cumque deserunt a.
                         </div>
                    </div>
               </div>
          </div>
     )
}