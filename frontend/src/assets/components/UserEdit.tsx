import {Image} from "@nextui-org/react";
import logoImage from '../static/login_icon.png'
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from 'axios';
import {userDataUrl, userUpdateUrl} from '../../configs/url'
import {useNavigate} from 'react-router-dom'

type UserData = {
  username:string | null,
  email : string | null,
  phone : string | null,
  password: string | null,

};





export const UserEdit = ()=>{

  const params = useParams()
  const navigate = useNavigate()
  

  const [user,setUser] = useState<UserData | null>(null)
  const [username,setUsername] = useState('')

  useEffect(()=>{
    axios.get(userDataUrl+`?username=${params.username}`)
    .then(res=>{
      
      setUser(res.data)
      setUsername(params.username!)
    })
    .catch(err=>console.log(err))


  },[])


  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    const {  value , name } = evt.target;
   



//     1. Type Guard and Narrowing:

// Use a type guard to check if prevUser is null and define a separate return type for each case. This ensures the returned object always has the required properties.


    setUser((prevUser: UserData | null) => {
      // Ensure name is not undefined
      const propertyName = name as keyof UserData;
      console.log(prevUser)
      if (!prevUser) {
        return { [propertyName]: value! } as UserData; // Assert as UserData for type guard
      }
    
      return { ...prevUser, [propertyName]: value! };
    }
    );


  };


  const handleUpdate = ()=>{
    const data = user ;
    
  if (data !== null) {
    // Create a new object with properties from UserData and UserType
     const updatedData = new FormData();
     updatedData.append('username', user?.username ?? ''); // Use default if null
     updatedData.append('password', user?.password ?? '');
     updatedData.append('email', user?.email ?? '');
     updatedData.append('phone', user?.phone ?? '');
     console.log('updated Data ',updatedData)


    axios.put(userUpdateUrl,updatedData).then(res=>{
      console.log(res)
      if (res.data.userUpdated){
        navigate('/admin')
      }
    }).catch((err)=>console.log(err))


  }}
    return(
        <div className="h-full     mt-16 bg-gradient-to-r from-green-400 to-blue-500  "> 

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
    <input type="text"  onChange={handleChange}   name="username" value={user?.username ?? ''}  className="bg-white border border-green-800 text-gray-900 text-sm rounded-lg focus:ring-blue-500  focus:outline-green-500 block w-full p-2.5 dark:bg-white-700 dark:border-green-800 dark:placeholder-gray-400 dark:text-black dark:focus:ring-green-500 dark:focus:border-blue-500" placeholder="name@flowbite" />

  </div>
  <div className="mb-5">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900 text-left">phone Number</label>
    <input type="text"  onChange={handleChange}   name="phone" value={user?.phone ?? ''}  className="bg-white border border-green-800 text-gray-900 text-sm rounded-lg focus:ring-blue-500  focus:outline-green-500 block w-full p-2.5 dark:bg-white-700 dark:border-green-800 dark:placeholder-gray-400 dark:text-black dark:focus:ring-green-500 dark:focus:border-blue-500" placeholder="96556453655" />

  </div>
  <div className="mb-5">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900 text-left">Emal</label>
    <input type="email"  onChange={handleChange}   name="email" value={user?.email ?? ''} className="bg-white border border-green-800 text-gray-900 text-sm rounded-lg focus:ring-blue-500  focus:outline-green-500 block w-full p-2.5 dark:bg-white-700 dark:border-green-800 dark:placeholder-gray-400 dark:text-black dark:focus:ring-green-500 dark:focus:border-blue-500" placeholder="test@mymail.com" />

  </div>

  <div className="mb-5">
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900 text-left">Password</label>
    <input type="password"  onChange={handleChange}   value={user?.password ?? ''} name="password" className="bg-white border border-green-800 text-gray-900 text-sm rounded-lg focus:ring-blue-500  focus:outline-green-500 block w-full p-2.5 dark:bg-white-700 dark:border-green-800 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="**********" />
  </div>
<div className="text-center">
<button type="button" onClick={handleUpdate} className="text-white  bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-green-500-600 dark:bg-green-500 dark:focus:ring-green-500 ">Update</button>

</div>
  
</form>

                </div>
          </div>
        </div>
    )
}