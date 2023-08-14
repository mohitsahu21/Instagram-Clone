import React, { useContext, useEffect, useState } from 'react';
import './profile.css'
import { UserContext } from '../../App';

const Profile = ()=>{
    const [loading, setLoading] = useState(false);
    const [myPosts,setMyPosts] = useState([]);
    const {state,dispatch} = useContext(UserContext);
    const [image,setImage] = useState("")
   
    useEffect(()=>{
        setLoading(true);
        fetch('/mypost' , {
            headers: {
                "Authorization" : "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then((result) => {
            setLoading(false);
            setMyPosts(result.mypost)
           })
    },[])

    useEffect(()=>{
         if(image){
            const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","insta-clone");
        data.append("cloud_name","dhryrs3lr");
        fetch("https://api.cloudinary.com/v1_1/dhryrs3lr/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
           fetch("/updateprofilepic",{
            method:"put",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : "Bearer " + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                profilePic:data.url
            })

           }).then(res => res.json())
           .then(result => {
              localStorage.setItem("user",JSON.stringify({...state,profilePic:result.profilePic}));
              dispatch({type:"UPDATEPIC",payload : result.profilePic})
           })
           
        })
        .catch(err=>{
            console.log(err)
        })

         }
    },[image])

    const updateProfilePic = (file)=>{
        setImage(file)
        
    }
    return(
        <>
            {loading
                ?
                <div className='loadingMain'>
                <div className="progress">
              <div className="indeterminate"></div>
              
          </div>
          <div className='loadingImgContainer'><img className='loadingImg' src="https://i.gifer.com/7plU.gif"/></div>
          
          
          </div>
                :
                <div className='main'>
                <div className='main_container'>

                
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
                <div className='edit_pic_btn'>
                    <div className="file-field input-field">
                                <div className="btn #64b5f6 blue darken-1">
                                    <span>Update pic</span>
                                    <input type="file" onChange={(e) => updateProfilePic(e.target.files[0])} />
                                </div>
                                <div className="file-path-wrapper">
                                    <input className="file-path validate" type="text" />
                                </div>
                            </div>
                    </div>
                </div>
                
                <div className='gallery'>
                    {myPosts.map((item) => {
                        return <img key={item._id} className='item' src={item.photo} alt={item.title} />
                    })}


                </div>
            </div>
                
            }

        </>
    )
}
export default Profile;