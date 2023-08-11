import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import M from "materialize-css";




const ResetPassword = ()=>{
    
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    

    const PostData= ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            return M.toast({html: "Email not valid", classes: 'rounded red'})
        }
        fetch('/reset-password',
        {
            method:"POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
            
                email
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
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => {setEmail(e.target.value)}}
                />

               
                <button className="btn waves-effect waves-light #42a5f5 blue darken-1"
                    onClick={() => { PostData() }
                    }>submit

                </button>
                

            </div>
        </div>
    )
}
export default ResetPassword;