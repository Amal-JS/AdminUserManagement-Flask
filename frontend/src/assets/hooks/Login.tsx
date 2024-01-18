import {useState} from 'react';
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'
import { userLoginUrl } from '../../configs/url';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { userLoggedIn } from '../../redux/reducer/userSlice';

type UserData = string; // username and password string

type userDetailsType = {
    refresh : string,
    access : string,
    username : string,
    isSuperUser : boolean
}

export const LoginHook = ()=>{

                const [userName,setUsername] = useState<UserData>('')
                const [password,setPassword] = useState<UserData>('')
                const navigate = useNavigate()

                const dispatch = useDispatch<AppDispatch>()
              
                const FormFieldsEmptyCheck = (): boolean => {

                    if (userName == "" || password == "") {
                      toast.error("Empty form can't be submitted.", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                      });
                      // form empty
                      return false
                    }
                    
                    //form not empty
                    return true;

                  };

                  const handleSubmit = (userType : string = 'user') => {

                    const fieldCheck = FormFieldsEmptyCheck()
                  
                    if (fieldCheck){
                            loginHandle(userType)

                    }
                    else{
                       return ;
                        
                    }
                  }

                  const loginHandle = (userType : string)=>{

                    let userDetails : userDetailsType;

                    const userCheck = async () =>{

                        const data = {
                            username :userName,
                            password : password
                        }

                        try {

                            const userExist = await axios.post(userLoginUrl,data)
                         
                              console.log('user login server response :',userExist)

                                    if (userExist){

                                        if (userExist.data.msg == 'Invalid Credentials')
                                        {
                                            toast.error("Wrong Credentials. No user ", {
                                                position: "top-right",
                                                autoClose: 5000,
                                                hideProgressBar: false,
                                                closeOnClick: true,
                                                pauseOnHover: true,
                                                draggable: true,
                                                progress: undefined,
                                                theme: "colored",
                                              });
                                            return ;
                                        }

                                        
                                        userDetails = userExist.data;

                        //check the user is valid 
                        if (userType == 'user'){

                            //Empty the fields
                            setUsername('')
                            setPassword('')

                            console.log('user block')

                            toast.success("Login successfull.", {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "colored",
                                onClose :()=>{
                                      //save the username tokens in global state
                                      
                                      dispatch(userLoggedIn(
                                        {
                                          user:userDetails.username,
                                          userLogged:true,
                                          accessToken:userDetails.access,
                                          refreshToken:userDetails.refresh
                                        }
                                      ))
                                      
                                      navigate('/');
                                }
                              });

                         
                         

                        }else{

                            if (userDetails.isSuperUser){

                                //Empty the fields
                                setUsername('')
                                setPassword('')


                               

                                toast.success("Login successfull.", {
                                    position: "top-right",
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "colored",
                                    onClose: () => {

                                          console.log('entered the admin dispatch')
                                          
                                          dispatch(userLoggedIn(
                                            {
                                              adminUser:userDetails.username,
                                              userLogged:true,
                                              accessToken:userDetails.access,
                                              refreshToken:userDetails.refresh,
                                              isAdmin:true
                                            }
                                          ))
                                          navigate('/admin') // Adjust the delay time as needed
                                      },
                                    });
                               

                                //

                                console.log('admin block')

                                //save the admin username tokens in the local storage,

                               

                              
                            }
                            else{

                                toast.error("You don't have nessassary permissions. ", {
                                    position: "top-right",
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "colored",
                                  });

                            }
                            
                        }
                        //check user type if user add to local storage or cookie
                        //if admin check the admin type if not toast no permission to access it
                        //then in the local storage add the username and 
                        //store the refresh token and access token

                                    }

                        }catch (error) {

                            console.log(error)
                            toast.error("Wrong Credentials. No user ", {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "colored",
                              });


                        }
                 
                       
                    }
                    userCheck()

                  }
                  const handleUserName = (evt:React.ChangeEvent<HTMLInputElement>) => setUsername(evt.target.value)
                  const handlePassword = (evt:React.ChangeEvent<HTMLInputElement>) => setPassword(evt.target.value)

                  return {
                    userName,
                    password,
                    setUsername,
                    setPassword,
                    handleSubmit,
                    handlePassword,
                    handleUserName,
                    FormFieldsEmptyCheck,
                    loginHandle,
                    
                  }
}