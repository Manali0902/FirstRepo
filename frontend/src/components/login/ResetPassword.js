import axios from 'axios';
import React, { useState }  from 'react';
import { toast} from 'react-toastify';
import { useHistory } from 'react-router-dom';

toast.configure();
export default function ResetPassword() {

    const history = useHistory();

    const [pass, setPass] = useState("");
    const [confirmPass , setConfirmPass] = useState("");
    const [token, setToken] = useState("");
    // setToken(localStorage.getItem("auth"));

    async function reset() {

        await setToken(window.location.search.slice(1))
        console.log("frontend token: "+token)
        if(pass === ""){
            toast.info("Please enter some password", {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }
        else
        if(pass.length <6){
            toast.info("Password length should be more than 6", {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }else
        if(!(pass === confirmPass)){
            toast.info("Password and confirm password does not match", {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }
        else
        if(pass === confirmPass){
            var obj = {
                "token": token,
                "password": pass
            }
            await axios.post("http://localhost:3000/resetpass/resetpassword",obj).then((resp)=>{
                console.log(resp.data)
                if(resp.data === "Updated Successfully"){
                    toast.info("Password changed... Login again", {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                        localStorage.setItem("auth","");
                        history.push("/login",{from:"ResetPassword"});
                }
            })
        } 
        // axios.post("http://localhost:3000/sendmail/forgotpassword",{
        //     "UserEmail":mail
        // }).then((resp)=>{
            // toast.info("Reset Cicked", {
            //     position: "bottom-center",
            //     autoClose: 5000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            //     });
        // })
    }
    
    
    return(
        <div>
        <div className="HeaderBG">
        <br></br>
        RESET PASSWORD
        <br></br>
        <br></br>
        </div>
        <br></br>
        <br></br>
        New Password:&emsp;
        <input type= "password" onChange = {(e)=>setPass(e.target.value)}/> 
        <br></br>
        <br></br>
        Confirm New Password:&emsp;
        <input type= "password" onChange = {(e)=>setConfirmPass(e.target.value)}/> 
        <br></br>
        <br></br>
        <button onClick= {()=>reset()}>Reset</button>
        </div>
    )
}