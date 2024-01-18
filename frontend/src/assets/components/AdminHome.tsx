import {Button} from "@nextui-org/react";
import { useEffect , useState } from "react";
import { FaUser } from "react-icons/fa";
import CustomTable from "./Table";
import { Navigate, useNavigate } from "react-router";
import axios from 'axios';
import {  userDataUrl, userDeleteUrl} from "../../configs/url";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedOut } from "../../redux/reducer/userSlice";



type UsersData = {
            username:string,
            email : string,
            phone : string,
            password: string,
            image : string | null
}[]

export const AdminHome = ()=>{

    const navigate = useNavigate()

    const [users,setUsers] = useState<UsersData | null >(null)

    const [filteredUsers,setFilteredUsers] = useState<UsersData | null >(null)

    const dispatch = useDispatch<AppDispatch>()

    const admin = useSelector<RootState>(state => state.user.isAdmin);



    if (!admin){
        return <Navigate to={'/adminLogin'}></Navigate>
    }

    useEffect(()=>{

        getAllUsersData()
    },[])




    const getAllUsersData = async () => {
        try {
            const response = await axios.get(userDataUrl);
            console.log(response.data)
            setUsers(response.data);
            setFilteredUsers(response.data);
          
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handleDelete = (username : string) : void=> {
      
        axios.delete(userDeleteUrl+`?username=${username}`)
        .then(res=>{ getAllUsersData() })
        .catch(err=>console.log(err))        

    }


    const handleLogout =() : void =>{

        //clear the username and accessToken from the local storage
        dispatch(userLoggedOut())
       
        console.log('removed the Admin details from the local storage')
        navigate('/adminLogin')
        
    }

    const handleFilterUser = (evt: React.ChangeEvent<HTMLInputElement>): void =>{
            const filterValue = evt.target.value;
            if (users){
                setFilteredUsers(users.filter((data)=>data.username.startsWith(filterValue)))
            
            }
            
    }

    return (
        <>
    
        <div className="text-right p-2 bg-stone-800">
        <Button color="danger" className="" variant="bordered" startContent={<FaUser />} onClick={handleLogout}>
        Logout
      </Button>
        </div>

        <div className="p-12">
        <div className=" w-full shadow-2xl border-2  rounded-md px-20 ">

<div className="flex justify-center w-full">

<div className="h-full w-[80%] bg-white mt-6  " >

      
      <form className="w-full ">    
<label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
<div className="relative">
<div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
    </svg>
</div>
<input type="search"  onChange={handleFilterUser}   id="default-search" className="block w-full p-4 ps-10 text-xl text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-black dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Users..."  />

</div>
</form>
   
</div>


</div>


{/* 
table content */}

<div className="mb-6 flex justify-center w-full  bg-white mt-6">
    
    <div className="w-[80%]   border-black shadow-2xl border-2 p-3  rounded-md ">
            <CustomTable usersArray={filteredUsers} handleDelete={handleDelete}/>
    </div>
</div>


</div>
        </div>


       
       
     
           
         </>
    )
}