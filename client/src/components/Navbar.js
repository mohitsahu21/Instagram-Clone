
import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../App';

 function Navbar(){
    const {state,dispatch} = useContext(UserContext);
    

    return(
        
  <nav>
  <div className="nav-wrapper white">
    <Link to={state ? "/" : "login"} className="brand-logo left">Instagram</Link>
    {state ?
    (<ul id="nav-mobile" className="right">
       <li><Link to="profile">Profile</Link></li>
      <li><Link to="create">Create Post</Link></li>
      <li><Link to="login" onClick={()=>{
         localStorage.clear();
         dispatch({type:"CLEAR"})
      }
       
      }>Logout</Link></li>
      </ul>)
      :
     ( <ul id="nav-mobile" className="right">
      <li><Link to="/login">Login</Link></li>
      <li><Link to="/signup">Sign Up</Link></li>
      </ul>)}
    
      
    
  </div>
</nav>
      
    )
};

export default Navbar;