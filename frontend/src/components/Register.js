import React, { useState } from 'react';
import { Button } from 'reactstrap';
import axios from 'axios';
import { toast} from 'react-toastify';
import { useHistory, Link } from 'react-router-dom';
import validator from 'validator';
export default function Register() {

    const history = useHistory();

    const [email,setEmail] = useState('');
    const [mailError,setMailError] = useState("");
    const [name,setName] = useState('');
    const [pass,setPass] = useState('');
    const [passError,setPassError] = useState("");
    const [birthday,setDate] = useState('');
    const [dateError,setDateError] = useState("");
    const [mobile,setMobile] = useState('');
    const [mobileError,setMobileError] = useState("");

    function register() {
        if (email === ""){
            setMailError("Enter email please");
        }
        else if ( !validator.isEmail(email)){
            setMailError("Enter Valid Email Id");
        }
        else if (pass === ""){
            setPassError("Enter password please");
        }
        else if (pass.length <6){
            setPassError("Password length should be atleast 6")
        }
        // else if( !validator.isDate(birthday)){
        //     setDateError("Enter Valid Date");
        // }
        else if( mobile.length < 10 || mobile.length>10){
            setMobileError("Enter a valid mobile number");
        }
        else{
        var obj = {
            "UserEmail":email,
            "UserName":name,
            "Password":pass,
            "Birthday":birthday,
            "MobileNo":mobile
        }
    
        axios.post('http://localhost:3000/insert/createnewstudent',obj)
        .then((result)=>{
            console.log(result.data)
            toast.success('Registered Succesfully', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            history.push("/login",{from:"Register"})
        })
        // alert("Login Called")
    }
}


    return(
        <div >
            <div className = "HeaderBG">
                <br></br>
                <b>Register Page</b>
                <br></br>
                <br></br>
            </div>
            <br></br>
            <div >
                Enter Email:&emsp;
                <input type= "text" onChange = {(e)=>setEmail(e.target.value)}/>
                <br></br>
                <font size="2" color="red">{mailError}</font>
                <br></br>
                <br></br>
                Enter Name:&emsp;
                <input type= "text" onChange = {(e)=>setName(e.target.value)}/>
                <br></br>
                <br></br>
                <br></br>
                Enter Password:&emsp;
                <input type= "password" onChange = {(e)=>setPass(e.target.value)}/>
                <br></br>
                <font size="2" color="red">{passError}</font>
                {/* {setPassError("")} */}
                <br></br>
                <br></br>
                Enter Birthday:&emsp;
                <input type= "text" onChange = {(e)=>setDate(e.target.value)}/>
                <br></br>
                <font size="2" color="red">{dateError}</font>
                <br></br>
                <br></br>
                Enter Mobile No:&emsp;
                <input type= "text" onChange = {(e)=>setMobile(e.target.value)}/>
                <br></br>
                <font size="2" color="red">{mobileError}</font>
                <br></br>
                <br></br>
                <Button onClick= {()=>register()}>REGISTER</Button>
                <br></br>
                <br></br>
                <font size="1"><Link to="/login">Already have an account? Click here</Link></font>
            </div>
        </div>
    )
}


