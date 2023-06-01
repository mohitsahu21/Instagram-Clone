import React from 'react';
import { Link } from 'react-router-dom';

const Signup = ()=>{
    return(
        <div className='mycard'>
            <div className='card auth-card input-field'>
                <h2>Instagram</h2> 
                <input 
                type='text'
                placeholder='Name'
                />
                <input 
                type='email'
                placeholder='Email'
                />

                <input 
                type='password'
                placeholder='Password'
                />
                 <button className="btn waves-effect waves-light #42a5f5 blue lighten-1">Sign up
    
                </button>
                <h6 className='bottom'>
                Have an account? <span  ><Link  to="/login">Log in </Link></span> 
                </h6>

            </div>
        </div>
    )
}
export default Signup;