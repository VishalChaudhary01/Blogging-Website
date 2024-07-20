import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";

interface BlogCardProps {
     id: number;
     author: string;
     publishDate: string;
     title: string;
     content: string;
}

export const BlogCard = ({ 
     id,
     author,
     publishDate,
     title,
     content,
 }: BlogCardProps) => {
     return (
          <Link to={`/blogs/${id}`}>
               <div className="p-4 border-b boder-gray-300 pb-4 w-screen max-w-screen-md cursor-pointer">
                    <div className="flex">
                         <div className="items-cente">
                              <Avatar name={author} />
                         </div>
                         <div className="px-2">
                              {author}
                         </div>
                         <div className="flex justify-center flex-col">
                              <span className="rounded-full w-1 h-1 bg-gray-400"></span>
                         </div>
                         <div className="pl-1 font-thin text-gray-500">{publishDate}</div>
                    </div>
                    <div className="py-2 text-2xl text-gray-800 font-bold">
                    {title}
                    </div>
                    <div className="font-normal text-gray-800">
                         {content.slice(0, 100) + (content.length > 100 ? "..." : "")}
                    </div>
                    <div className="text-gray-500 text-sm font-normal pt-4">
                         {`${Math.ceil(content.length / 100)} minutes(s) read`}
                    </div>
               </div>
          </Link>
     )
}