import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

function Protected(props) {
   
    let Component = props.component;

    const navigate = useNavigate()

    useEffect(()=>{
        if(!localStorage.getItem('user-info')){
            navigate('/register');
        }
    })

    return (
        <>
            <Component />
        </>
    )
} 

export default Protected