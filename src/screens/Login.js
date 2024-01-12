import React, { useRef, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();
  const emailref = useRef();
  const passwordref = useRef();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_AUTH_KEY}`,
        {
          method: "POST",
          body: JSON.stringify({
            email: emailref.current.value,
            password: passwordref.current.value,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error.message);
      } else {
        // console.log(data);
        localStorage.setItem("token", data.idToken);
        alert("Logged in successfully!!");
        history.replace("/expenses");
      }
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <Container className="container">
      <Form className="form" onSubmit={submitHandler}>
        <h2
          style={{
            textAlign: "center",
            marginBottom: "1.5rem",
            fontWeight: "500",
          }}
        >
          Login
        </h2>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="Enter email"
            required
            ref={emailref}
          />
        </Form.Group>
        <Form.Group className="mb-3 position-relative" controlId="formBasicPassword">
          <Form.Control
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            required
            ref={passwordref}
          />
          <FontAwesomeIcon
            icon={showPassword ? faEye : faEyeSlash}
            onClick={togglePasswordVisibility}
            style={{
              position: "absolute",
              top: "50%",
              right: "10px",
              transform: "translateY(-50%)",
              cursor: "pointer",
            }}
          />
        </Form.Group>
        <Link to='/forgotpassword' style={{display:'flex',marginTop: "5px",textDecoration: "none", color: "black", justifyContent:'center'  }}>Forgot password?</Link>
        <Button
          type="submit"
          variant="primary"
          style={{ width: "100%", marginTop: "5px", borderRadius: "20px" }}
        >
          Login
        </Button>
      </Form>

      <Link to="/" style={{ textDecoration: "none", color: "black" }}>
        <button className="buttonControl">
          Don't have an account? Sign Up
        </button>{" "}
      </Link>
    </Container>
  );
};

export default Login;
