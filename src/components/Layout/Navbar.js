import React  from "react";
import { Navbar, Button, Dropdown } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const NavbarComponent = (props) =>{
    const history = useHistory()
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
            // console.log(data);
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
        <Navbar
        style={{
          height: "5rem",
          display: "flex",
          justifyContent: "space-between",
          backgroundColor:'black',
          zIndex:'10',
          position:'fixed',
          left:'0',
          top:'0',
          width:'100%'
        }}
      >
        <Navbar.Brand style={{ fontWeight: "800", marginLeft: "2rem",color:'white' }}>
          Expense Tracker
        </Navbar.Brand>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginRight: "3rem",
          }}
        >
          <Dropdown style={{ margin: "3px 6px" }}>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              Profile
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={props.onshowmodal}>Update Profile</Dropdown.Item>
              <Dropdown.Item onClick={verificationHandler}>
                Verify email
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Button onClick={logoutHandler} style={{ margin: "2px 5px" }}>
            Logout
          </Button>
        </div>
      </Navbar>
    )
}

export default NavbarComponent