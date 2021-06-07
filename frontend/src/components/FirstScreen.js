import React from 'react';
import { Link } from 'react-router-dom';

export default function FirstScreen() {
    
    return(
        <div className="HeaderBG">
        <br></br>
        <Link className = "HeaderBG" to = "login">LOGIN</Link>  &emsp; &emsp; &emsp;
        <Link className = "HeaderBG" to = "register">REGISTER</Link>  
        <br></br>
        <br></br>
        </div>

    )
}