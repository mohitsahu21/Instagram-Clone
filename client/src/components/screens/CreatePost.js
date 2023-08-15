
import React, { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import M from "materialize-css"
import axios from "axios";

const CreatePost =  ()=>{
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [title,setTitle] = useState("");
    const [image,setImage] = useState("");
    const [url,setUrl] = useState("");
    useEffect(()=>{
        if(url){
        setLoading(true);
        fetch('/https://instaclone-api-8pcu.onrender.com/createpost',
        {
            method:"POST",
            headers: {
                "Content-Type":"application/json",
                "Authorization": "Bearer "+ localStorage.getItem("jwt")
            },
            body: JSON.stringify({
               title,
               pic: url
            })  
        }).then((res) => res.json())
        .then((data) =>{
            setLoading(false);
            if(data.error){
                M.toast({html: data.error, classes: 'rounded red'})
            }
            else{
                
                M.toast({html: "Post Created Successfully", classes: 'rounded green'});
                navigate('/')

            }
        }).catch((err) => {console.log(err)})
    }
    },[url])


    const postDetails= ()=>{
        setLoading(true);
        const data = new FormData()
        data.append("file",image);
        data.append("upload_preset","insta-clone");
        data.append("cloud_name","dhryrs3lr");
      axios.post("https://api.cloudinary.com/v1_1/dhryrs3lr/image/upload",data)
        .then((res)=>{
            setLoading(false);
            setUrl(res.data.secure_url)})
        .catch(err=>console.log(err))
        
    }


    return (
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
        <div className='card' style={{
            margin: "30px auto",
            maxWidth: "500px",
            padding: "20px",
            textAlign: "center"
        }}>
            <input type='text' placeholder='title' value={title} 
            onChange={(e)=>{setTitle(e.target.value)}}/>

            <div className="file-field input-field">
      <div className="btn waves-effect waves-light #42a5f5 blue darken-1">
        <span>Upload Image</span>
        <input type="file" onChange={(e) => {setImage(e.target.files[0])}}/>
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text"/>
      </div>
    </div>
    <button className="btn waves-effect waves-light #42a5f5 blue darken-1"
    onClick={postDetails}>Submit Post
    
    </button>
        </div>

    }
        
        </>
    )
}

export default CreatePost;