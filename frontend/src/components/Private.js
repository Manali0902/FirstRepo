import React from 'react';
import { Redirect } from 'react-router-dom';

export default function Private(props){
    const Cmp = props.cmp;
    var auth = localStorage.getItem('auth')
    console.log(auth)
    return <div>{auth ? <Redirect to= '/userlist'/> : <Cmp/> }</div>
}

