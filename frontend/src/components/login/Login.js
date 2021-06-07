import React, { useState } from 'react';
import axios from 'axios';
import { toast} from 'react-toastify';
import { Link, Redirect, useHistory } from 'react-router-dom';
import validator from 'validator';

import 'react-toastify/dist/ReactToastify.css';

toast.configure();
export default function Login(){

    const history = useHistory();

    const [UserEmail, setMail] = useState("");
    const [mailError,setMailError] = useState("");
    const [Password, setPass] = useState("");
    const [passError,setPassError] = useState("");

    async function login() {
        if (UserEmail === ""){
            await setMailError("Enter email please");
            toast.error(mailError, {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }
        else if ( !validator.isEmail(UserEmail)){
            await setMailError("Enter Valid Email Id");
            toast.error(mailError, {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }
        else if (Password === ""){
            await setPassError("Please enter password")
            toast.error(passError, {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }
        else{
        var obj = {"UserEmail":UserEmail,"Password":Password};
        var token = "";
        await axios.post('http://localhost:3000/login/credentials',obj)
        .then((result)=>{
            if(result.data === "Invalid Email or password"){
                toast.error("Invalid Email or password", {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            }
            else if(result.data === "User Not Found"){
                toast.error("User Not Found", {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            }
            else{
                localStorage.setItem("auth",result.data.Token)
            token = result.data.Token; 

            if(token !== "")
            {
                toast.success('Login Successful', {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                // <Link to= 'userlist'>UserLists</Link>
                history.push("/userlist",{from:"Login"})
            }
            }
            
        })
        // alert("Login Called")
    }

    }

        return(
            <div>
                <div className = "HeaderBG">
                <br></br>
                <b>Login Page</b>
                <br></br>
                <br></br>
                </div>
                <br></br>
                <div>
                
                    Enter Email:&emsp;
                    <input type= "text" onChange = {(e)=>setMail(e.target.value)}/> 
                    <br></br>
                    <br></br>
                    Enter Password:&emsp;
                    <input type= "password" onChange = {(e)=>setPass(e.target.value)}/>
                    <br></br>
                    <br></br>
                    <button onClick= {()=>login()}>LOGIN</button>
                    <br></br>
                    <br></br>
                    <font size="1"><Link to="/forgotpassword">Forgot Password? Click here</Link></font>
                    <br></br>
                    <font size="1"><Link to="/register">Don't have an account? Click here</Link></font>
                </div>
            </div>
        )
}
