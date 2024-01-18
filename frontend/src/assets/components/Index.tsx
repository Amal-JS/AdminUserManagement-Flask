import {BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import { AdminHome } from './AdminHome'
import { AdminLogin } from './AdminLogin'
import { UserEdit } from './UserEdit'
import { UserHome } from './UserHome'
import { UserLogin } from './UserLogin'
import { UserSignUp } from './UserSignUp'
import  {store}  from '../../redux/store'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'


export const Index =()=>{
    return (
        <>
        <Provider store={store}>
        <Router>
            <Routes>
                
                <Route path='/' element={<UserHome/>}></Route>
                <Route path='admin'>
                    <Route index element={<AdminHome />}/>
                    <Route path="edit/:username" element={<UserEdit/>}/>
                </Route>
                <Route path='/userLogin' element={<UserLogin/>}></Route>
                <Route path='/adminLogin' element={<AdminLogin/>}></Route>
                <Route path='/userSignUp' element={<UserSignUp/>}></Route>
               
            </Routes>
        </Router>
        </Provider>
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
        </>
    )
}