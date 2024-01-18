import {Button} from "@nextui-org/react";
import { useEffect , useState , useRef} from "react";
import { FaUser } from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";
import axios from 'axios';
import {userDataUrl} from '../../configs/url'
import { useSelector , useDispatch } from "react-redux";
import {  userLoggedOut} from "../../redux/reducer/userSlice";
import { AppDispatch ,RootState } from "../../redux/store";

   

type userData = {
    username:string,
    phone : number,
    email : string, 
    image : string
}

export const UserHome = ()=>{

    const user = useSelector<RootState>((state=>state.user.user))
  

    const navigate = useNavigate()

    const [loggedUser,setLoggedUser] = useState< userData | null >(null)
   
    const fileInputRef = useRef<HTMLInputElement|null>(null)
    const dispatch = useDispatch<AppDispatch>()

    // const userInLocalStorage : UserNameType = localStorage.getItem('user') 

    // const user = useSelector<RootState>(state => state.user.user);

    // const dispatch = useDispatch<AppDispatch>()
  
    
    useEffect(()=>{    

        if (user){
            getUserData() 
         }
        

       

    },[loggedUser?.username])

    
    const getUserData = async () => {
            
        const data = await axios.get(userDataUrl+`?username=${user}`)
        
        setLoggedUser(data.data)
  
    }


    const handleLogout =() : void =>{

        //clear the username and accessToken from the local storage
        //dispatchmethod to trigger the action 
        
        setLoggedUser(null)
        dispatch(userLoggedOut())

        navigate('/userLogin')
        
    }

    const handleImageClick = ()=>{
        fileInputRef.current?.click()
    }


    const handleImageInput = (evt : React.ChangeEvent<HTMLInputElement> )=>{
        
        const data = new FormData();
        let selectedFile;
  const files = ( evt.target as HTMLInputElement).files
  if (files){

    selectedFile = files[0]
  }
  data.append('username', user as string);
  data.append('image', selectedFile as Blob);

   
        axios.put(userDataUrl,data,{
            headers: {
                "Content-Type": "multipart/form-data",
              }
        })
        .then((res)=>{
         
            getUserData()
        }
            )
        .catch((err)=>console.log(err))
      
        
    }

    if(!user)
       return <Navigate to={"/userLogin"}/>

    return (
        <>
        <div className="relative">
        <Button color="danger" className="absolute right-10 top-3 hover:bg-white" variant="bordered" startContent={<FaUser />} onClick={handleLogout}>
        Logout
      </Button>
        </div>
   
        <div className="flex justify-center h-2/4">
          
        <div className=" border-cyan-500  shadow-2xl p-1 my-24 w-9/12 flex h-full">
            <div className="h-full w-4/12 p-2">

            <img className="object-contain h-64 w-96  shadow-gray-500 shadow-2xl mb-3" src={loggedUser?.image ? 'http://localhost:5000/'+loggedUser?.image : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/480px-User-avatar.svg.png"}/>
            <button onClick={handleImageClick} type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm p-2  text-center  w-full">Change picture</button>
            <input onChange={handleImageInput} type='file' className="invisible" name='image' accept=".jpeg , .jpg , .png" ref={fileInputRef}></input>
            </div>


            <div className="h-full w-8/12 p-6 flex  ">
                <div className="w-6/12 border-l-1 p-3 border-x-gray-600">
                <p className="text-sm text-gray-500 font-normal  my-3">Name :</p>
                <p className="text-sm text-gray-500 font-normal  my-3">Email :</p>
                <p className="text-sm text-gray-500 font-normal  my-3">Phone :</p>
                </div>
                 
                <div className="w-6/12 b ">
                <p className="text-xl font-normal  my-3 text-blue-600 underline">{loggedUser?.username}</p>
                <p className="text-sm text-red-600 font-normal  my-3">{loggedUser?.email}</p>
                <p className="text-sm text-black font-bold my-3">{loggedUser?.phone}</p>
                </div>
                
            </div>
        </div>
            
        </div> </>
    )
}