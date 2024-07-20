import { ChangeEvent, useState } from "react";
import { SignupType } from "@repo/common/index";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signin" | "signup"}) => {
     const navigate = useNavigate();
     const [userInfo, setUserInfo] = useState<SignupType>({
          name: "",
          email: "",
          password: "",
     });

     async function sendRequest() {
          try {
               const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signin" ? "signin" : "signup"}`, userInfo)
               const jwt = response.data;
               localStorage.setItem("token", jwt);
               navigate("/blogs");
          } catch (e) {
               console.log(e);
               alert("Something went wrong")
          }
     }

     return (
          <div className="h-screen flex flex-col justify-center">
               <div className="flex justify-center">
                    <div>
                         <div className="px-8 font-bold text-3xl">
                              Create an account
                         </div>
                         <div className="px-8 max-w-lg">
                              {type === "signin" ? "Don't have an account?" : "Already have an account?" }
                              <Link className="pl-2 underline hover:text-blue-600" to={type === "signin" ? "/signup" : "/signin"}>
                                   {type === "signin" ? "Sign up" : "Sign in"}
                              </Link>
                         </div>
                         <div className="py-4">
                              {type === "signup" ? <LabelledInput label="Name" placeholder="John Doe..." onChange={(e) => {
                                   setUserInfo({
                                        ...userInfo,
                                        name: e.target.value
                                   })
                              }}/> : null}
                              <LabelledInput label="Email" placeholder="john@example.com" type="email" onChange={(e) => {
                                   setUserInfo({
                                        ...userInfo,
                                        email: e.target.value
                                   })
                              }}/>
                              <LabelledInput label="Password" placeholder="123456" type="password" onChange={(e) => {
                                   setUserInfo({
                                        ...userInfo,
                                        password: e.target.value
                                   })
                              }}/>
                              <button onClick={sendRequest} type="button" className="mt-6 w-full bg-gray-800 hover:bg-gray-900 text-white rounded-lg py-2 font-medium" >
                                   {type === 'signin' ? "Sign in" : "Sign up"}
                              </button>
                         </div>
                    </div>
               </div>
          </div>
     )
}

interface LabelledInputType {
     label: string;
     placeholder: string;
     type?: string;
     onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function LabelledInput({ label, placeholder, type, onChange }: LabelledInputType) {
     return (
          <div>
               <label className="block mt-4 mb-1  text-sm font-semibold text-gray-900">{label}</label>
               <input type={type || "text" } onChange={onChange} className="px-4 bg-gray-50 block w-full border border-gray-300 text-gray-900 text-sm rounded-lg hover:border-black block p-2.5 placeholder-gray-400" placeholder={placeholder} />
          </div>
     )
}