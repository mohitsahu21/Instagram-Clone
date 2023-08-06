import React, { useState,useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import M from "materialize-css";
import { UserContext } from '../../App';



const Login = ()=>{
    const {state,dispatch} = useContext(UserContext);
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const PostData= ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            return M.toast({html: "Email not valid", classes: 'rounded red'})
        }
        fetch('/signin',
        {
            method:"POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
            
                email,
                password
            })  
        }).then((res) => res.json())
        .then((data) =>{
           
            if(data.error){
                M.toast({html: data.error, classes: 'rounded red'})
            }
            else{
                localStorage.setItem("jwt",data.token);
                localStorage.setItem("user",JSON.stringify(data.user));
                dispatch({type:"USER",payload:data.user})
                M.toast({html:"Sign in successfully", classes: 'rounded green'});
                navigate('/')

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

                <input 
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => {setPassword(e.target.value)}}
                />
                <button className="btn waves-effect waves-light #42a5f5 blue darken-1"
                    onClick={() => { PostData() }
                    }>Log in

                </button>
                <h6 className='bottom'>
               Don't have an account? <Link className='blue-text text-darken-1'  to="/signup">Sign up </Link>
                </h6>

            </div>
        </div>
    )
}
export default Login;