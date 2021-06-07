import React, {Component, useEffect, useState} from 'react';
import { Button, Table } from 'reactstrap'; 
import axios from 'axios';
import { toast} from 'react-toastify';
import validator from 'validator';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css' 

export default function UserList(props) {

    const history = useHistory();

    var [userData,setUserData] = useState("")
    var [visibility, setVisibility] = useState("none")
    const [email,setEmail] = useState('');
    const [mailError,setMailError] = useState("");
    const [name,setName] = useState('');
    const [id,setId] = useState('');
    const [passError,setPassError] = useState("");
    const [birthday,setDate] = useState('');
    const [dateError,setDateError] = useState("");
    const [mobile,setMobile] = useState('');
    const [mobileError,setMobileError] = useState("");

    useEffect(()=>
    {
        function getData(){
        axios.get("http://localhost:3000/getallstudents/alldetails").then((result)=>{
        setUserData(result.data);
        })
        }
        getData();
    },[])
    
    function edit(id,name,phone,birthday,email) {
        
            setId(id)
            setName(name)
            setMobile(phone)
            setDate(birthday)
            setEmail(email)
            setVisibility("block")
            

    }

    function del(id) {
        confirmAlert({
            title: 'Confirm to Delete',
            message: 'Are you sure you want to delete this.',
            buttons: [
              {
                label: 'Yes',
                onClick: () => axios.delete('http://localhost:3000/delete/remove/'+id)
                .then((result)=>{
                    console.log(result)
                    toast.success('User Deleted', {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                    window.location.reload(false)
                })
              },
              {
                label: 'No',
                
              }
            ]
          })
        
    }

    function cancelEdit() {
        setVisibility("none")
    }

    function submit(){
        if (email === ""){
            setMailError("Enter email please");
        }
        else if ( !validator.isEmail(email)){
            setMailError("Enter Valid Email Id");
        }
        else if( birthday === ""){
            setDateError("Enter Date please");
        }
        else if (mobile === ""){
            setMobileError("Enter Mobile number please")
        }
        else if( mobile.length < 10 || mobile.length>10){
            setMobileError("Enter a valid mobile number");
        }
        else{
        var obj = {
            "UserEmail":email,
            "UserName":name,
            "Birthday":birthday,
            "MobileNo":mobile
        }
    
        axios.put(`http://localhost:3000/editstudent/update/${id}`,obj)
        .then((result)=>{
            console.log(result.data)
            toast.success('User updated', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                })
            window.location.reload(false)
        })
    //     // alert("Login Called")
    }
    }

    function createUser() {
        history.push("/createuser",{from:"Userlist"});
    }

    function resetPass() {
        const token = localStorage.getItem("auth");
        history.push(`/resetpassword?${token}`,{from:"Userlist"})
    }

    function logout() {
        localStorage.setItem("auth","");
        history.push("/login",{from:"Userlist"});
        
    }

    return(
        <div>  
            <div style={{ marginBottom: '20px' }}>
                <br></br>
            <Button variant="outlined" color="primary" onClick={()=>createUser()}>
                 Add User
            </Button>&emsp;
            <Button variant="outlined" color="primary" onClick={()=>logout()}>
                 Logout
            </Button>&emsp;
            <Button variant="outlined" color="primary" onClick={()=>resetPass()}>
                 Change Password
            </Button>
            </div>
                <h2>User Data</h2> 
                <Table width= "100%"><tr><td>
            <Table width="100%" >
                <th>Name</th>
                <th>Mobile No.</th>
                <th>Birthday</th>
                <th>Email ID</th>
                <th>Edit</th>
                <th>Delete</th>
                {
                    userData.length >0 && userData.map((users)=>{
                        return <tr>
                            <td>{users.UserName}</td>
                            <td>{users.MobileNo}</td>
                            <td>{users.Birthday}</td>
                            <td>{users.UserEmail}</td>
                            <td><button id={users._id} onClick={(e)=>edit(users._id,users.UserName,users.MobileNo,users.Birthday, users.UserEmail)}>EDIT</button></td>
                            <td><button id={users._id} onClick={(e)=>del(e.target.id)}>DELETE</button></td>
                        </tr>
                    })
                }
            </Table></td>
            <td>
                <Table id="formTable" style={{display:visibility}}>
                UserEmail:&emsp;
                <input type= "text" value={email} onChange = {(e)=>setEmail(e.target.value)}/>
                <br></br>
                <font size="2" color="red">{mailError}</font>
                <br></br>
                <br></br>
                UserName:&emsp;
                <input type= "text" value={name} onChange = {(e)=>setName(e.target.value)}/>
                <br></br>
                <br></br>
                <br></br>
                Birthday:&emsp;
                <input type= "text" value={birthday} onChange = {(e)=>setDate(e.target.value)}/>
                <br></br>
                <font size="2" color="red">{dateError}</font>
                <br></br>
                <br></br>
                MobileNo:&emsp;
                <input type= "text" value= {mobile} onChange = {(e)=>setMobile(e.target.value)}/>
                <br></br>
                <font size="2" color="red">{mobileError}</font>
                <br></br>
                <br></br>
                <Button onClick= {()=>submit()}>SUBMIT</Button>
                <br></br>
                <br></br>
                <Button onClick= {()=>cancelEdit()}>CANCEL</Button>  
                </Table>
                </td></tr></Table>

        </div>  
    )
}

 