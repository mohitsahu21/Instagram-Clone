import React, { useContext, useEffect, useState } from 'react';
import './profile.css'
import { UserContext } from '../../App';
import { json, useParams } from 'react-router-dom';


const UserProfile = ()=>{
    const {userid} = useParams();
    const [updateProfile,setUpdateProfile] = useState(false);
    const [userPosts,setUserPosts] = useState(null);
    const {state,dispatch} = useContext(UserContext);
   
    useEffect(()=>{
        fetch(`https://instaclone-api-8pcu.onrender.com/user/${userid}`, {
            headers: {
                "Authorization" : "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then((result) => {
            
            setUserPosts(result)
        }).catch(err=>{
            console.log(err)
        })
    },[updateProfile]);
   
    const followUser=()=>{
        fetch('https://instaclone-api-8pcu.onrender.com/follow', {
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
            
            setUpdateProfile(!updateProfile);
           dispatch({type:"UPDATE",payload:{followers:result.followers,following: result.following}});
           localStorage.setItem("user",JSON.stringify(result));
        }).catch(err=>{
            console.log(err)
        });
       
    }
    const unFollowUser=()=>{
        fetch('https://instaclone-api-8pcu.onrender.com/unfollow', {
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
            
            setUpdateProfile(!updateProfile);
           dispatch({type:"UPDATE",payload:{followers:result.followers,following: result.following}});
           localStorage.setItem("user",JSON.stringify(result));
        }).catch(err=>{
            console.log(err)
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
                <div className='loadingMain'>
                    <div className="progress">
                        <div className="indeterminate"></div>

                    </div>
                    <div className='loadingImgContainer'><img className='loadingImg' src="https://i.gifer.com/7plU.gif" /></div>


                </div>
        }
         
        </>
    )
   
}
export default UserProfile;