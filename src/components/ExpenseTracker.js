import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const ExpenseTracker = ()=>{
    return (
        <>
        <header>
            <nav style={{display:'flex',justifyContent:'space-between'}}> 
            <h1>Welcome to Expense Tracker !!</h1>
            <div>
                Your profile is incomplete, <Link to='/profile'>click here</Link> to update your profile
            </div>
            </nav>
        </header>
        </>
    )
}

export default ExpenseTracker