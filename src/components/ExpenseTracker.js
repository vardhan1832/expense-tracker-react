import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const ExpenseTracker = ()=>{
    const verificationHandler = async () =>{
        try{
            const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.REACT_APP_AUTH_KEY}`,{
                method:'POST',
                body:JSON.stringify({
                    requestType:"VERIFY_EMAIL",
                    idToken:localStorage.getItem('token')
                }),
                headers:{
                    'Content-type':'application/json; charset=UTF-8'
                }
            })
            const data = await res.json()
            if(!res.ok){
                throw new Error(data.error.message || 'Something went wrong!');
            }else{
                console.log(data)
                alert('please check your email to verify')
            }
        }catch(err){
            console.log(err.message)
        }
    }
    return (
        <>
        <header>
            <nav style={{display:'flex',justifyContent:'space-between'}}> 
            <h1>Welcome to Expense Tracker !!</h1>
            <Button onClick={verificationHandler}>Verify email</Button>
            <div>
                Your profile is incomplete, <Link to='/profile'>click here</Link> to update your profile
            </div>
            </nav>
        </header>
        </>
    )
}

export default ExpenseTracker