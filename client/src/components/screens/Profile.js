import React, { useContext, useEffect, useState } from 'react';
import './profile.css'
import { UserContext } from '../../App';

const Profile = ()=>{
    const [myPosts,setMyPosts] = useState([]);
    const {state,dispatch} = useContext(UserContext);
    useEffect(()=>{
        fetch('/mypost' , {
            headers: {
                "Authorization" : "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then((result) => {
            setMyPosts(result.mypost)
           })
    },[])
    return(
        <>
        {myPosts
         ?
        <div className='main'>
        <div className='container'>
            <div>
                <img className='profilePic' src='https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60'/>
            </div>
            <div>
                <h4>{ state ? state.name : "Loading"}</h4>
                <div className='infoContainer'>
                    <h6>{myPosts.length} posts</h6>
                    <h6>{state.followers.length} followers</h6>
                    <h6>{state.following.length} following</h6>
                </div>
            </div>
        </div>
        <div className='gallery'>
            {myPosts.map((item) => {
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
export default Profile;