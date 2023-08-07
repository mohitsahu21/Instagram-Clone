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
                            <img className='profilePic' 
                            src={state? state.profilePic: "https://res.cloudinary.com/dhryrs3lr/image/upload/v1691422523/uynekzpqngfnx2jmgmnl.jpg"} alt='profilepic' />
                        </div>
                        <div>
                            <h4>{state ? state.name : "Loading"}</h4>
                            <h5>{state ? state.email : "Loading"}</h5>
                            <div className='infoContainer'>
                                <h6>{myPosts? myPosts.length : "0"} posts</h6>
                                <h6>{state ? state.followers.length : "0"} followers</h6>
                                <h6>{state ? state.following.length : "0"} following</h6>
                            </div>
                        </div>
                    </div>
                    <div className='gallery'>
                        {myPosts.map((item) => {
                            return <img key={item._id} className='item' src={item.photo} alt={item.title} />
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