import React, { useContext, useEffect, useState } from 'react';
import './profile.css'
import { UserContext } from '../../App';
import { useParams } from 'react-router-dom';


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
    },[])
    return(
        <>
        {userPosts ?    
          <div className='main'>
          <div className='container'>
              <div>
                  <img className='profilePic' src='https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60'/>
              </div>
              <div>
                  <h4>{userPosts.user.name}</h4>
                  <h5>{userPosts.user.email}</h5>
                  <div className='infoContainer'>
                      <h6>{userPosts.posts.length} posts</h6>
                      <h6>40 followers</h6>
                      <h6>40 following</h6>
                  </div>
              </div>
          </div>
          <div className='gallery'>
              {userPosts.posts.map((item) => {
                    return <img key={item._id} className='item' src={item.photo} alt={item.title}/>
              })}
              
             
          </div>
      </div> 

        :
        <h2>Loading...!</h2>
        }
         
        </>
    )
   
}
export default UserProfile;