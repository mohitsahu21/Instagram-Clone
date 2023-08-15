
import React, { useState } from 'react';
import { Link, useNavigate,useParams } from 'react-router-dom';
import M from "materialize-css";




const NewPassword = ()=>{
    
    const navigate = useNavigate();
    const {token} = useParams();
    
    const [password,setPassword] = useState("");
   
    const PostData= ()=>{
        
        fetch('/https://instaclone-api-8pcu.onrender.com/new-password',
        {
            method:"POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
            
                token,
                password
            })  
        }).then((res) => res.json())
        .then((data) =>{
           
            if(data.error){
                M.toast({html: data.error, classes: 'rounded red'})
            }
            else{
               
                M.toast({html:data.message, classes: 'rounded green'});
                navigate('/login')

            }
        }).catch((err) => {console.log(err)})
    }

    return(
        <div className='mycard'>
            <div className='card auth-card input-field'>
                <h2>Instagram</h2> 
                
                <input 
                type='password'
                placeholder='Enter New Password'
                value={password}
                required
                onChange={(e) => {setPassword(e.target.value)}}
                />
                <button className="btn waves-effect waves-light #42a5f5 blue darken-1"
                    onClick={() => { PostData() }
                    }>Submit

                </button>
               
            </div>
        </div>
    )
}
export default NewPassword;