
import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../App';

function Navbar() {
   const { state, dispatch } = useContext(UserContext);
   const navigate = useNavigate();

   return (

      <nav>
         <div className="nav-wrapper white">
            <Link to={state ? "/" : "login"} className="brand-logo left">Instagram</Link>
            {state ?
               (<ul id="nav-mobile" className="right">
                  <li><Link to="profile">Profile</Link></li>
                  <li><Link to="create">Create Post</Link></li>
                  <li><Link to="myfollowingPosts">My Following Posts</Link></li>
                  <li><button className="btn #c62828 red darken-3" onClick={() => {
                     localStorage.clear();
                     dispatch({ type: "CLEAR" })
                     navigate("/login")
                  }}>
                     Logout
                  </button>
                  </li>
               </ul>)
               :
               (<ul id="nav-mobile" className="right">
                  <li><Link to="/login">Login</Link></li>
                  <li><Link to="/signup">Sign Up</Link></li>
               </ul>)}



         </div>
      </nav>

   )
};

export default Navbar;