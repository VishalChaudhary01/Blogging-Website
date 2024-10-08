
export const Avatar = ({ name, size = "small" }: { name: string, size?: "small" | "big" }) => {
     return (
          <div className={`relative cursor-pointer inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${size === "small" ? "w-6 h-6" : "w-10 h-10"}`}>
               <span className={`${size === "small" ? "text-xs" : "text-md"} font-medium text-gray-100`}>
                    {name[0].toUpperCase()}
               </span>
          </div>
     )
}