import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";
import DOMPurify from "dompurify";

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
     const [imageSources, setImageSources] = useState([""])
     const senitizedContent = DOMPurify.sanitize(content);
     const parser = new DOMParser();
     const doc = parser.parseFromString(senitizedContent, 'text/html');
     const AllText = doc.body.firstChild?.textContent || "";

     useEffect(() => {
          const images = doc.getElementsByTagName("img");
          const imgSrcArray = Array.from(images).map(img => img.src);
          setImageSources(imgSrcArray);
     }, [])

     return (
          <Link to={`/blog/${id}`}>
               <div key={id} className="p-4 border-b boder-gray-300 pb-4 w-screen max-w-screen-md cursor-pointer">
                    <div className="grid grid-cols-3">
                         <div className="col-span-2">
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
                              <div className="font-normal text-gray-800" dangerouslySetInnerHTML={{ __html: AllText.slice(0, 100) + (AllText.length > 100 ? "..." : "")}} />
                              <div className="text-gray-500 text-sm font-normal pt-4">
                                   {`${Math.ceil(AllText.length / 100)} minutes(s) read`}
                              </div>
                         </div>
                         <div>
                              {imageSources.length !== 0 && <img src={imageSources[0]} alt={`Image`} />}
                         </div>
                    </div>

                         
               </div>
          </Link>
     )
}