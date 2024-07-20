export const BlogCardSkeleton = () => {
     return (
          <div className="flex justify-center">
               <div className="p-4 border-b boder-gray-300 pb-4 w-screen max-w-screen-md cursor-pointer">
                    <div role="status" className="max-w-sm animate-pulse">
                         <div className="flex">
                              <div className="items-cente">
                                   <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
                              </div>
                         </div>
                         <div className="my-2 py-2 h-2 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
                         <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                         <div className="mt-4 h-2 bg-gray-200 rounded-full max-w-[300px] mb-2.5"></div>
                    </div>
               </div>
          </div>
     )
}


