import {Image} from "@nextui-org/react";
import logoImage from '../static/login_icon.png'
import { useState } from "react";
import axios from 'axios';
import { userSignUpUrl } from "../../configs/url";
import {  toast } from "react-toastify";
import {useNavigate} from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type userData = {
  username?:string,
  phone ?: number,
  email ?: string, 
  password ?: string
}





export const UserSignUp = ()=>{

  const [newUser,setNewUser] = useState<userData |  null>(null)
  const navigate = useNavigate()

  const handleNewUserData = (evt : React.ChangeEvent<HTMLInputElement> )=> {
    const {  value , name } = evt.target;
   



//     1. Type Guard and Narrowing:

// Use a type guard to check if prevUser is null and define a separate return type for each case. This ensures the returned object always has the required properties.


setNewUser({
...newUser,
[name]:value as string
})
      
    


 

}
 
 const handleSignUp = () => {
  const data = newUser;
  axios.post(userSignUpUrl,data).
  then((res)=>{
    console.log('response :',res)
    if(res.data.userCreationSuccessfull){

      toast.success("Account created successfully.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        onClose :()=>{
                                    
          setTimeout(()=>{navigate('/userLogin')},2000)
      }
      });
    }

  }).catch((err)=>console.log(err))
 }

 
    return(
        <div className="h-full     mt-16 bg-gradient-to-r from-green-400 to-blue-500  "> 
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
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900 text-left">Username</label>
    <input type="text" onChange={handleNewUserData} name="username" value={newUser?.username} className="bg-white border border-green-800 text-gray-900 text-sm rounded-lg focus:ring-blue-500  focus:outline-green-500 block w-full p-2.5 dark:bg-white-700 dark:border-green-800 dark:placeholder-gray-400 dark:text-black dark:focus:ring-green-500 dark:focus:border-blue-500" placeholder="name@flowbite" />

  </div>
  <div className="mb-5">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900 text-left">phone Number</label>
    <input type="text" name="phone" onChange={handleNewUserData} value={newUser?.phone} className="bg-white border border-green-800 text-gray-900 text-sm rounded-lg focus:ring-blue-500  focus:outline-green-500 block w-full p-2.5 dark:bg-white-700 dark:border-green-800 dark:placeholder-gray-400 dark:text-black dark:focus:ring-green-500 dark:focus:border-blue-500" placeholder="96556453655" />

  </div>
  <div className="mb-5">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900 text-left">Emal</label>
    <input type="email" name="email" onChange={handleNewUserData} value={newUser?.email} className="bg-white border border-green-800 text-gray-900 text-sm rounded-lg focus:ring-blue-500  focus:outline-green-500 block w-full p-2.5 dark:bg-white-700 dark:border-green-800 dark:placeholder-gray-400 dark:text-black dark:focus:ring-green-500 dark:focus:border-blue-500" placeholder="test@mymail.com" />

  </div>

  <div className="mb-5">
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900 text-left">Password</label>
    <input type="password" onChange={handleNewUserData} name="password" value={newUser?.password} className="bg-white border border-green-800 text-gray-900 text-sm rounded-lg focus:ring-blue-500  focus:outline-green-500 block w-full p-2.5 dark:bg-white-700 dark:border-green-800 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="**********" />
  </div>
<div className="text-center">
<button type="button"  onClick={handleSignUp} className="text-white  bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-green-500-600 dark:bg-green-500 dark:focus:ring-green-500 ">Sign Up</button>

</div>
  
</form>

                </div>
          </div>
        </div>
    )
}