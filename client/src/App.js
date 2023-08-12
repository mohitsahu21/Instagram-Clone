
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter,Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import Home from './components/screens/Home';
import Login from './components/screens/Login';
import Signup from './components/screens/Signup';
import Profile from './components/screens/Profile';
import CreatePost from './components/screens/CreatePost';
import { createContext, useEffect, useReducer } from 'react';
import { reducer , initialState} from './components/reducer/useReducer';
import UserProfile from './components/screens/UserProfile';
import FollowingUserPosts from './components/screens/FollowingUserPosts';
import ResetPassword from './components/screens/ResetPassword';
import NewPassword from './components/screens/NewPassword';

export const UserContext = createContext();


function App() {

 const navigate = useNavigate();
 const location = useLocation();
 const [state,dispatch] = useReducer(reducer,initialState);

useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"));
   
    if(user){
      dispatch({type:"USER",payload:user})
      
    }
    else{
      if(!location.pathname.startsWith('/reset'))
      navigate('/login')
    }
},[])


  return (
  <>
    <UserContext.Provider value={{state,dispatch}}>
    <Navbar/> 
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route exact path='/profile' element={<Profile/>}/>  
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/create' element={<CreatePost/>}/>   
    <Route exact path='/reset_password' element={<ResetPassword/>}/>   
    <Route path='/reset_password/:token' element={<NewPassword/>}/>   
    <Route path='/myfollowingPosts' element={<FollowingUserPosts/>}/>   
    <Route path='/profile/:userid' element={<UserProfile/>}/>   
    </Routes>
    </UserContext.Provider>
    </>

   
  );
}

export default App;
