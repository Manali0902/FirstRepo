import axios from 'axios';
import React, { useState}  from 'react';
import { useHistory } from 'react-router-dom';
import { toast} from 'react-toastify';

toast.configure();
export default function ForgorPassword() {

    const history = useHistory();
    const [mail, setMail] = useState("");

    async function sendLink() {
        const resp = await axios.post("http://localhost:3000/sendmail/forgotpassword",{
            "UserEmail":mail
        })
        
            console.log("Responseeeee: "+resp.data)
            if(resp.data === "User Not Found"){
                toast.info("User Not Found", {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            }
            else if(resp.data === "Mail has been sent, check your inbox"){
                toast.info("Mail has been sent, check your inbox", {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                    history.push("/login",{from:"ForgotPassword"})
            }
            
            
     
    }
    
    return(
        <div>
        <div className="HeaderBG">
        <br></br>
        FORGOT PASSWORD
        <br></br>
        <br></br>
        </div>
        <br></br>
        <br></br>
        Enter Email:&emsp;
            <input type= "text" onChange = {(e)=>setMail(e.target.value)}/> 
            <br></br>
            <br></br>
            <button onClick= {()=>sendLink()}>Send Link</button>
        </div>
    )
}