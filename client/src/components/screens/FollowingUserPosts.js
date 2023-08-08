import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../App';
import './home.css'
import { Link, useLoaderData } from 'react-router-dom';
import moment from "moment";

const FollowingUserPosts = ()=>{
    const [loading, setLoading] = useState(false);
    const {state,dispatch} = useContext(UserContext);
    const [commentText, setCommentText] = useState('');
    const [data,setData] = useState([]);
   
    useEffect(()=>{
        setLoading(true);
        fetch('/getfollowingposts' , {
            headers: {
                "Authorization" : "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then((result) => {
            
            setLoading(false);
            setData(result.posts)})
    },[])

    const likePost = (id)=>{
       fetch('like',{
        method:'PUT',
        headers:{
            "Content-Type":"application/json",
            "Authorization": "Bearer "+ localStorage.getItem("jwt")
        },
        body:JSON.stringify({
            postId : id
        })

       }).then(res => res.json())
       .then(result => {
           
           const newData = data.map((item) =>{
            if(item._id == result._id){
                return result
            }
            else{
                return item
            }
           })
           setData(newData)
       })

       
    }
    const deletePost = (postId) => {
  
        fetch(`deletepost/${postId}`,{
           method: "delete",
           headers:{
               "Authorization": "Bearer "+ localStorage.getItem("jwt")
           }
        }).then((res) => res.json()).
        then((data) => setData(data))
        .catch(((err) => console.log(err)))
}
    const unlikePost = (id)=>{
        fetch('unlike',{
         method:'PUT',
         headers:{
             "Content-Type":"application/json",
             "Authorization": "Bearer "+ localStorage.getItem("jwt")
         },
         body:JSON.stringify({
             postId : id
         })
 
        }).then(res => res.json())
        .then(result => {
            
           const newData = data.map((item) =>{
            if(item._id == result._id){
                return result
            }
            else{
                return item
            }
           })
           setData(newData)
        })
     }

     const deleteComment = (postId,commentId)=>{
        fetch("/deletecomment",{
            method: "put",
            headers: {
                "Content-Type":"application/json",
                "Authorization": "Bearer "+ localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId,
                commentId
            })
        }).then((res) => res.json())
        .then(result => {
        
           const newData = data.map((item) =>{
            if(item._id == result._id){
                return result
            }
            else{
                return item
            }
           })
           setData(newData)
        }).catch((err)=> console.log(err));
             
    }

     const makeComment = (text,postId)=>{
        fetch("/comment",{
            method: "put",
            headers: {
                "Content-Type":"application/json",
                "Authorization": "Bearer "+ localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId,
                text
            })
        }).then((res) => res.json())
        .then(result => {
          
           const newData = data.map((item) =>{
            if(item._id == result._id){
                return result
            }
            else{
                return item
            }
           })
           setData(newData)
        }).catch((err)=> console.log(err));
     }
    return(
         
        <>
        {
            loading
            ?
            <div className="progress">
            <div className="indeterminate"></div>
        </div>
            :
            <div className='home'>

            {data.map((item) => {
                return <div className='card home-card' key={item._id}>
               <div className='user_details'>
                <Link to={item.postedBy._id !== state._id ? `/profile/${item.postedBy._id}` : `/profile/`}> <img  src={item.postedBy.profilePic}/></Link>

                <div className='userfield'>
            <h6><Link to={item.postedBy._id !== state._id ? `/profile/${item.postedBy._id}` : `/profile/`}> <span className='userName'>{item.postedBy.name}</span></Link> </h6>
           <span className='date'>Post {moment(item.date).fromNow()} </span>
            </div>
            
            {item.postedBy._id == state._id  && <i  style={{float:"right",cursor:"pointer"}} 
            id='delete_icon' className="material-icons" onClick={()=> {deletePost(item._id)}}>delete</i>}

                </div>
               
                <div className='card-image'>
                   <img src={item.photo}/>
                </div>
                <div className='card-content'>
                
                {item.likes.includes(state._id)
                ? 
                <i style={{cursor:"pointer"}} onClick={()=>{unlikePost(item._id)}} className="material-icons red-text">favorite</i>
                //   <i onClick={()=>{unlikePost(item._id)}} className="material-icons">thumb_down</i>
                    
                :
                <i  style={{cursor:"pointer"}} onClick={()=>{likePost(item._id)}} className="material-icons">favorite_border</i>
                //   <i onClick={()=>{likePost(item._id)}} className="material-icons">thumb_up</i>
                }
                
                
                    <h6>{item.likes.length} likes</h6>
                    <h6>{item.title}</h6>
                    <p>{item.body}</p>
                    {item.comments.map((record)=>{
                        return (
                            <h6 key={record._id}><span style={{fontWeight:"500"}}>{record.postedBy.name}</span> {record.text}{(item.postedBy._id == state._id || record.postedBy._id == state._id)  && <i  style={{float:"right" , cursor: "pointer"}} className="material-icons" onClick={()=> {deleteComment(item._id,record._id)}}>delete</i>} </h6>
                        )
                    })}
                    <form onSubmit={(e)=>{
                        e.preventDefault();
                        if (!commentText.trim()) {
                            
                            return;
                          }
                
                        makeComment(commentText,item._id);
                        setCommentText('');  // Reset the input value after submitting the form
                          
                    }
                    } style={{"display" : 'flex'}}>
                        <input type='text' placeholder='add a comment' value={commentText} 
                        onChange={(e) => setCommentText(e.target.value)} />
                      
                    

                        </form>
                    
                </div>
            </div>
            })}
            

          
        </div>
        }
        
        </>
    )
}
export default FollowingUserPosts;