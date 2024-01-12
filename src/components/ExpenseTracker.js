import React from "react";
import { Button, Navbar} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";

const ExpenseTracker = () => {
  const history = useHistory();
  const verificationHandler = async () => {
    try {
      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.REACT_APP_AUTH_KEY}`,
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: localStorage.getItem("token"),
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error.message || "Something went wrong!");
      } else {
        console.log(data);
        // localStorage.setItem("isVerified", true)
        alert("please check your email to verify");
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  const logoutHandler = () => {
    localStorage.removeItem("token");
    history.replace("/login");
  };
  return (
    <Navbar className="bg-body-tertiary" style={{height:'4rem',display:'flex',justifyContent:'space-between'}}>
        <Navbar.Brand style={{fontWeight:'800',marginLeft:'2rem'}}>Expense Tracker</Navbar.Brand>
        <div style={{display:'flex',justifyContent:'space-between'}}>
        <Button onClick={verificationHandler}>Verify email</Button>
          <Button onClick={logoutHandler}>Logout</Button>
          <Navbar.Text>
            <Link to="/profile">click here</Link> to update your profile.
          </Navbar.Text>
        </div>
          
    </Navbar>
  );
};

export default ExpenseTracker;
