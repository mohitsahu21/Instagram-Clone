import React from 'react';
import { Link } from 'react-router-dom';

const Login = ()=>{
    return(
        <div className='mycard'>
            <div className='card auth-card input-field'>
                <h2>Instagram</h2> 
                <input 
                type='text'
                placeholder='Email'
                />
                <input 
                type='password'
                placeholder='Password'
                />
                 <button className="btn waves-effect waves-light #42a5f5 blue lighten-1">Log in
    
                </button>
                <h6 className='bottom'>
               Don't have an account? <span  ><Link  to="/signup">Sign up </Link></span> 
                </h6>

            </div>
        </div>
    )
}
export default Login;