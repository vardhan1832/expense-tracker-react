import React, { useRef, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import "./Signup.css";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();
  const emailref = useRef();
  const passwordref = useRef();
  const confirmref = useRef();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      if (passwordref.current.value === confirmref.current.value) {
        const res = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_AUTH_KEY}`,
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
          alert("User created successfully!!");
          history.push("/login");
        }
      } else {
        alert("Password and Confirm Password does not match");
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
          Sign Up
        </h2>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="Enter email"
            required
            ref={emailref}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            required
            ref={passwordref}
          />
        </Form.Group>
        <Form.Group
          className="mb-3 position-relative"
          controlId="formBasicConfirmPassword"
        >
          <Form.Control
            type={showPassword ? "text" : "password"}
            placeholder="Retype password"
            required
            ref={confirmref}
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
        <Button
          type="submit"
          variant="primary"
          style={{ width: "100%", marginTop: "5px", borderRadius: "20px" }}
        >
          Sign In
        </Button>
      </Form>

      <Link to="/login" style={{ textDecoration: "none", color: "black" }}>
        <button className="buttonControl">Have an account? Login </button>
      </Link>
    </Container>
  );
};

export default SignUp;
