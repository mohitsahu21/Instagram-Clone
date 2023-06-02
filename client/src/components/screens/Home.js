import React from 'react';
import './home.css'
const Home = ()=>{
    return(
        <div className='home'>
            <div className='card home-card'>
                <h5>Mohit</h5>
                <div className='card-image'>
                   <img src='https://images.unsplash.com/photo-1685472152410-f10cbf641b94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4M3x8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60'/>
                </div>
                <div className='card-content'>
                <i className="material-icons red-text">favorite</i>
                    <h6>title</h6>
                    <p>this is amazing post</p>
                    <input type='text' placeholder='add a comment'/>
                </div>
            </div>

            <div className='card home-card'>
                <h5>Mohit</h5>
                <div className='card-image'>
                   <img src='https://images.unsplash.com/photo-1685042411324-2170698f2c66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEwNXxiRG80OGNVaHduWXx8ZW58MHx8fHx8&auto=format&fit=crop&w=600&q=60'/>
                </div>
                <div className='card-content'>
                <i className="material-icons red-text">favorite</i>
                    <h6>title</h6>
                    <p>this is amazing post</p>
                    <input type='text' placeholder='add a comment'/>
                </div>
            </div>

            <div className='card home-card'>
                <h5>Mohit</h5>
                <div className='card-image'>
                   <img src='https://images.unsplash.com/photo-1685472152410-f10cbf641b94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4M3x8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60'/>
                </div>
                <div className='card-content'>
                <i className="material-icons red-text">favorite</i>
                    <h6>title</h6>
                    <p>this is amazing post</p>
                    <input type='text' placeholder='add a comment'/>
                    
                </div>
            </div>

        </div>
    )
}
export default Home;