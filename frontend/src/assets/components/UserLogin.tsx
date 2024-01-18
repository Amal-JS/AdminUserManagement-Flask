import { Image } from "@nextui-org/react";
import logoImage from "../static/login_icon.png";
import "react-toastify/dist/ReactToastify.css";
import { LoginHook } from "../hooks/Login";

import {  useNavigate } from "react-router";

import { useSelector  } from "react-redux";
import {  RootState } from "../../redux/store";


export const UserLogin = () => {

  const navigate = useNavigate()

  const user = useSelector<RootState>(state => state.user.user)
 
  const {
    userName,
    password,
    handlePassword,
    handleSubmit,
    handleUserName
  }   = LoginHook()

  

  console.log('user ',user)
// if (user || adminUser){
//     return <Navigate to='/'></Navigate>
// }


  return (
    <div className="h-full     mt-16 bg-gradient-to-r from-green-400 to-blue-500  ">

 
      
      
      <div className=" h-4/12 flex justify-center bg-white">
        <Image width={300} alt="NextUI hero Image" src={logoImage} />
      </div>

      <div className="h-8/12  w-full flex justify-center px-2 pt-1 pb-2 ">
        <div className="w-5/12  shadow-2xl rounded-3xl bg-white my-5    mx-36">
          <form className="max-w-sm mx-auto p-4  mt-4">
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900 text-left"
              >
                Your username
              </label>
              <input
                value={userName}
                onChange={handleUserName}
                type="text"
                id="username"
                className="bg-white border border-green-800 text-gray-900 text-sm rounded-lg focus:ring-blue-500  focus:outline-green-500 block w-full p-2.5 dark:bg-white-700 dark:border-green-800 dark:placeholder-gray-400 dark:text-black dark:focus:ring-green-500 dark:focus:border-blue-500"
                placeholder="name@flowbite"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900 text-left"
              >
                Your password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePassword}
                className="bg-white border border-green-800 text-gray-900 text-sm rounded-lg focus:ring-blue-500  focus:outline-green-500 block w-full p-2.5 dark:bg-white-700 dark:border-green-800 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="**********"
              />
            </div>
            <div className="text-center">
              <button
                type="button"
                onClick={()=>{handleSubmit()}}
                className="text-white  bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-green-500-600 dark:bg-green-500 dark:focus:ring-green-500 "
              >
                
                Login
              </button>
            </div>
            <div className=" flex mt-6 items-center">
              <p className="text-sm text-black underline mx-3">Don't have an account??</p>
              <button
                type="button"
                onClick={()=>{navigate('/userSignUp')}}
                className="text-white  bg-blue-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-green-500-600 dark:bg-blue-500 dark:focus:ring-green-500 "
              >
                
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
