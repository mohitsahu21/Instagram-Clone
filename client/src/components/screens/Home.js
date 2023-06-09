import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../App';
import './home.css'
const Home = ()=>{
    const {state,dispatch} = useContext(UserContext);
    const [data,setData] = useState([])
    useEffect(()=>{
        fetch('/allpost' , {
            headers: {
                "Authorization" : "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then((result) => {
            console.log(result)
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
           console.log(result)
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
            console.log(result)
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
    return(
         

        <div className='home'>

            {data.map((item) => {
                return <div className='card home-card' key={item._id}>
                <h5>{item.postedBy.name}</h5>
                <div className='card-image'>
                   <img src={item.photo}/>
                </div>
                <div className='card-content'>
                
                {item.likes.includes(state._id)
                ? 
                <i onClick={()=>{unlikePost(item._id)}} className="material-icons red-text">favorite</i>
                //   <i onClick={()=>{unlikePost(item._id)}} className="material-icons">thumb_down</i>
                    
                :
                <i onClick={()=>{likePost(item._id)}} className="material-icons">favorite_border</i>
                //   <i onClick={()=>{likePost(item._id)}} className="material-icons">thumb_up</i>
                }
                
                
                    <h6>{item.likes.length} likes</h6>
                    <h6>{item.title}</h6>
                    <p>{item.body}</p>
                    <input type='text' placeholder='add a comment'/>
                </div>
            </div>
            })}
            

          
        </div>
    )
}
export default Home;