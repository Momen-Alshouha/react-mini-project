import Header from './Header';
import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

function Login() {
   
    const [email,setEmail] =useState("");
    const [password,setPassword] = useState("");

    const navigate = useNavigate()

    useEffect(()=>{
        if(localStorage.getItem('user-info')){
            navigate('/add');
        }
    })

    async function login() {
        let item = {email,password}
        let result =await fetch("http://127.0.0.1:8000/api/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            body:JSON.stringify(item)
        })
        result = await result.json();
        localStorage.setItem("user-info",JSON.stringify(result));
        navigate('/add');
    }

    return (
        <>
        <Header />
        <h1 className="display-4">login</h1>
        <div className='col-sm-6 offset-sm-3'>
            <input className='form-control' onChange={(e) => setEmail(e.target.value)} type="text" placeholder='email' /><br />
            <input className='form-control' onChange={(e) =>setPassword(e.target.value)} type="password" placeholder='password'  /><br />
            <button onClick={login} className='btn btn-primary'>Login</button>
        </div><br />
        <Footer />
        </>
    )
} 

export default Login