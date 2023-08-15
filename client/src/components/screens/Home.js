import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../App';
import './home.css'
import { Link } from 'react-router-dom';
import moment from "moment";

const Home = ()=>{
    const [loading, setLoading] = useState(false);
    const {state,dispatch} = useContext(UserContext);
    const [commentText, setCommentText] = useState('');
    const [data,setData] = useState([]);
    const [commentsId,setCommentsId] = useState();
    const [showcomment,setShowComment] = useState(true);
   
    useEffect(()=>{
        setLoading(true);
        fetch('/https://instaclone-api-8pcu.onrender.com/allpost' , {
            headers: {
                "Authorization" : "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then((result) => {
            setLoading(false);
            setData(result.posts)}).catch((err)=> console.log(err));
    },[])

    const likePost = (id)=>{
       fetch('/https://instaclone-api-8pcu.onrender.com/like',{
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
       }).catch((err)=> console.log(err));

       
    }
    const deletePost = (postId) => {
  
        fetch(`/https://instaclone-api-8pcu.onrender.com/deletepost/${postId}`,{
           method: "delete",
           headers:{
               "Authorization": "Bearer "+ localStorage.getItem("jwt")
           }
        }).then((res) => res.json()).
        then((data) => setData(data))
        .catch(((err) => console.log(err)))
}
    const unlikePost = (id)=>{
        fetch('/https://instaclone-api-8pcu.onrender.com/unlike',{
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
        }).catch((err)=> console.log(err));
     }

     const deleteComment = (postId,commentId)=>{
        fetch("/https://instaclone-api-8pcu.onrender.com/deletecomment",{
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
        fetch("/https://instaclone-api-8pcu.onrender.com/comment",{
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

    const showcomments= (id)=>{
          setCommentsId(id);
          setShowComment(!showcomment);
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
                <h6>{item.postedBy.name} <span id='title'>{item.title}</span></h6>
                
                {item.comments.length<=1 ? <p className='show_comments'>{item.comments.length} comment</p> : (showcomment ? <p className='show_comments' onClick={()=>{showcomments(item._id)}}>View all {item.comments.length} comments</p> : <p className='show_comments' onClick={()=>{showcomments(null)}}>View all {item.comments.length} comments</p> ) }
                
                
                {item.comments.map((record)=>{
                    return (
                        <h6  style={commentsId== item._id || item.comments.indexOf(record)== item.comments.length-1 ? {display:"block"}:{display:"none"} } key={record._id}>{record.postedBy.name}<span id='title'> {record.text}</span><br></br> <span className='commentDate'>{moment(record.date).fromNow()}</span> {(item.postedBy._id == state._id || record.postedBy._id == state._id)  && <i  style={{float:"right" , cursor: "pointer"}} className="material-icons" onClick={()=> {deleteComment(item._id,record._id)}}>delete</i>} </h6>
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
                    <input type='text' placeholder='Add a comment...' value={commentText} 
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
export default Home;