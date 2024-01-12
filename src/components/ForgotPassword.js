import React, { useState, useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const emailref = useRef();
  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.REACT_APP_AUTH_KEY}`,
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: emailref.current.value,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error.message || "Something went wrong!");
      } else {
        alert(
          "Email sent successfully! Please check your inbox to reset password"
        );
        console.log(data);
      }
    } catch (err) {
      console.log(err.message);
      alert(err.message);
    }
    setIsLoading(false);
  };
  return (
    <Container className="container">
      <Form className="form" onSubmit={submitHandler} style={{height:'300px'}}>
        <h2
          style={{
            textAlign: "center",
            marginBottom: "4rem",
            fontWeight: "500",
          }}
        >
          Expense Tracker
        </h2>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Text muted>
            Enter your registered email to update your password
          </Form.Text>
          <Form.Control
            type="email"
            placeholder="Enter email"
            required
            ref={emailref}
          />
        </Form.Group>
        {isLoading && <p style={{ marginTop: "5px" }}>sending link....</p>}
        {!isLoading && (
          <Button
            type="submit"
            variant="primary"
            style={{ width: "100%", marginTop: "5px", borderRadius: "20px" }}
          >
            Send Link
          </Button>
        )}
      </Form>

      <Link to="/login" style={{ textDecoration: "none", color: "black" }}>
        <button className="buttonControl">Have an account? Login</button>{" "}
      </Link>
    </Container>
  );
};

export default ForgotPassword