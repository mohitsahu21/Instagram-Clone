
import React, { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../App';
import M from "materialize-css";

function Navbar() {
   const { state, dispatch } = useContext(UserContext);
   const navigate = useNavigate();
   const searchModel = useRef(null);
   const [search,setSearch] = useState('');
   const [userDetails,setUserDetails] = useState([]);

   useEffect(()=>{
         M.Modal.init(searchModel.current)
   },[]);

   const fetchusers = (query)=>{
         setSearch(query);
         fetch('/search-users',{
            method:"post",
            headers:{
               "Content-Type":"application/json"
            },
            body:JSON.stringify({
               query
            })
         }).then(res=>res.json())
         .then(result=>{
            setUserDetails(result.user)
         })
   }

   return (

      <nav>
         <div className="nav-wrapper white">
            <Link to={state ? "/" : "login"} className="brand-logo left">Instagram</Link>
            {state ?
               (<ul id="nav-mobile" className="right">
                   <li><i data-target="modal1" style={{color:"black", cursor:"pointer"}} className="large material-icons modal-trigger">search</i></li>
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

         <div id="modal1" className="modal" ref={searchModel}  >
    <div className="modal-content" style={{color:"black"}}>
    <input 
                type='text'
                placeholder='Search users with email'
                value={search}
                onChange={(e) => {fetchusers(e.target.value)}}
                />
                <ul className="collection">
                   {state && userDetails.map(item=>{
                     return <Link key={item._id} to={item._id !== state._id ? "/profile/" + item._id : "/profile"} onClick={()=>{
                         M.Modal.getInstance(searchModel.current).close()
                         setSearch('')
                     }}> <li className="collection-item avatar" >
                     <img src={item.profilePic} alt="profilepic" className="circle"/>
                     <p><b>{item.email}</b><br></br>
                       {item.name}
                        
                     </p>
                     </li>
                     </Link> 
                  })}
              
  </ul>
    </div>
    <div className="modal-footer">
      <button className="modal-close waves-effect waves-green btn-flat" onClick={()=>{setSearch('')}}>close</button>
    </div>
  </div>
      </nav>

   )
};

export default Navbar;