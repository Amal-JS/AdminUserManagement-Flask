import {Image, useNavbar} from "@nextui-org/react";
import logoImage from '../static/admin_icon.png'
import {LoginHook} from '../hooks/Login'
import { ToastContainer } from "react-toastify";
import { FormEvent, useEffect } from "react";
import {Navigate, useNavigate} from 'react-router-dom'
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";


export const AdminLogin = ()=>{


    const navigate = useNavigate()

    const {
        userName,
        password,
        handleSubmit,
        handlePassword,
        handleUserName,
        

    }  =  LoginHook()

    const adminUser = useSelector<RootState>(state => state.user.adminUser)

    console.log('admin',adminUser)

useEffect(()=>{

    
},[])
     
if (adminUser){
   return <Navigate to={'/admin'} ></Navigate>
}  

  

    return(
        <div>
            <div className="h-full     mt-16 bg-gradient-to-r from-red-400 to-gray-900  "> 
            <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />



<div className=" h-4/12 flex justify-center bg-white">
<Image
width={300}
alt="NextUI hero Image"
src={logoImage}
/>
</div>
<div className="h-8/12  w-full flex justify-center px-2 pt-1 pb-2 ">
      <div className="w-5/12  shadow-2xl rounded-3xl bg-white my-5    mx-36">


      <form className="max-w-sm mx-auto p-4  mt-4">
<div className="mb-5">
<label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900 text-left">Admin username</label>
<input type="text" id="username" value={userName} onChange={handleUserName}  className="bg-white border border-green-800 text-gray-900 text-sm rounded-lg focus:ring-blue-500  focus:outline-gray-500 block w-full p-2.5 dark:bg-white-700 dark:border-green-800 dark:placeholder-gray-400 dark:text-black dark:focus:ring-gray-500 dark:focus:border-blue-500" placeholder="name@flowbite" />

</div>
<div className="mb-5">
<label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900 text-left">Admin password</label>
<input type="password" id="password" value={password} onChange={handlePassword}   className="bg-white border border-green-800 text-gray-900 text-sm rounded-lg focus:ring-blue-500  focus:outline-gray-500 block w-full p-2.5 dark:bg-white-700 dark:border-green-800 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="**********" />
</div>
<div className="text-center">
<button type="button" onClick={()=>
                                    {
                                        
                                        handleSubmit('admin')
                                    }
} className="text-white  bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-green-500-600 dark:bg-red-500 dark:focus:ring-red-500 ">Login</button>

</div>

</form>

      </div>
</div>
</div>
        </div>
    )
}