import React, { useContext, useEffect, useState } from 'react';
import './profile.css'
import { UserContext } from '../../App';
import { json, useParams } from 'react-router-dom';


const UserProfile = ()=>{
    const {userid} = useParams();
    
    const [userPosts,setUserPosts] = useState(null);
    const {state,dispatch} = useContext(UserContext);
   
    useEffect(()=>{
        fetch(`/user/${userid}`, {
            headers: {
                "Authorization" : "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then((result) => {
            
            setUserPosts(result)
        }) 
    },[userPosts]);
   
    const followUser=()=>{
        fetch('/follow', {
            method:"put",
            headers: {
                "Content-Type":"application/json",
                "Authorization" : "Bearer " + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                followId: userid
            })
        }).then(res=>res.json())
        .then((result) => {
            
           
           dispatch({type:"UPDATE",payload:{followers:result.followers,following: result.following}});
           localStorage.setItem("user",JSON.stringify(result));
        });
       
    }
    const unFollowUser=()=>{
        fetch('/unfollow', {
            method:"put",
            headers: {
                "Content-Type":"application/json",
                "Authorization" : "Bearer " + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                unfollowId: userid
            })
        }).then(res=>res.json())
        .then((result) => {
            
          
           dispatch({type:"UPDATE",payload:{followers:result.followers,following: result.following}});
           localStorage.setItem("user",JSON.stringify(result));
        });
       
    }

    return(
        <>
        {userPosts ?    
          <div className='main'>
          <div style={{ "border-bottom": "1px solid grey"}} className='container'>
              <div>
                  <img className='profilePic' 
                  src={userPosts.user.profilePic} alt='profilePic'/>
              </div>
              <div>
                  <h4>{userPosts.user.name}</h4>
                  <h5>{userPosts.user.email}</h5>
                  <div className='infoContainer'>
                      <h6>{userPosts.posts.length} posts</h6>
                      <h6>{userPosts.user.followers.length} followers</h6>
                      <h6>{userPosts.user.following.length} following</h6>
                  </div>
                  {userPosts.user.followers.includes(state._id)?
                  <button style={{margin:"10px 0"}} className="btn waves-effect waves-light #42a5f5 blue darken-1"
                  onClick={() => { unFollowUser() }
                  }>unfollow
   
              </button>
               :
               <button style={{margin:"10px 0"}} className="btn waves-effect waves-light #42a5f5 blue darken-1"
               onClick={() => { followUser() }
               }>follow

           </button>
              
                  }
                 
                 
              </div>
          </div>

          <div className='gallery'>
              {userPosts.posts.map((item) => {
                    return <img key={item._id} className='item' src={item.photo} alt={item.title}/>
              })}
              
             
          </div>
      </div> 

        :
        <div class="progress">
      <div class="indeterminate"></div>
  </div>
        }
         
        </>
    )
   
}
export default UserProfile;