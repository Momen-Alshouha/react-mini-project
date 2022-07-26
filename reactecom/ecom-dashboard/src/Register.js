import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function Register() {
    const [ name,setName] = useState("");
    const [ password,setPassword] = useState("");
    const [ email,setEmail] = useState("");
    const navigate = useNavigate()

    useEffect(()=>{
        if(localStorage.getItem('user-info')){
            navigate('/add');
        }
    })


    async function SignUp() {
        let item = {name,password,email};
        let result = await fetch("http://127.0.0.1:8000/api/register",{
            method:'POST',
            body:JSON.stringify(item),
            headers:{
                "Content-Type":'application/json',
                "Accept":'application/json'
            }
        })
        result = await result.json();
        localStorage.setItem("user-info",JSON.stringify(result));
        navigate('/add');
    }

    return (
       <>
       <Header />
        <div className="col-sm-6 offset-sm-3">
            <h1 className="display-4"> Register</h1>
            <input onChange={(e)=>setName(e.target.value)} value={name} className="form-control" placeholder="name" type="text"  /><br />
            <input onChange={(e)=>setPassword(e.target.value)} value={password} className="form-control" placeholder="password" type="password" /><br />
            <input onChange={(e)=>setEmail(e.target.value)} value={email} className="form-control" placeholder="email" type="email" /><br />
            <button onClick={SignUp} className="btn btn-primary">Sign Up</button>
        </div><br />
        <Footer />
       </>
    )
} 

export default Register