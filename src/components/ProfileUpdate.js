import React, { useState, useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";

const ProfileUpdate = (props) => {
  const [name,setname] = useState('')
  const [image, setimage] = useState('')
  const namechangehandler = (e) =>{
    setname(e.target.value);
  }
  const imagechangehandler = (e) =>{
    setimage(e.target.value)
  }
  useEffect(() => {
    const getuserprofile = async () => {
      try {
        const res = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.REACT_APP_AUTH_KEY}`,
          {
            method: "POST",
            body: JSON.stringify({
              idToken: localStorage.getItem("token"),
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
          setname(data.users[0].displayName) ;
          setimage(data.users[0].photoUrl);
          console.log(data);
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    getuserprofile();
  }, []);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.REACT_APP_AUTH_KEY}`,
        {
          method: "POST",
          body: JSON.stringify({
            idToken: localStorage.getItem("token"),
            displayName: name,
            photoUrl: image,
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
        alert("Profile updated successfully!");
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton onClick={props.onhide}>
        <Modal.Title>Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={namechangehandler}
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>ImageURL</Form.Label>
            <Form.Control
              type="text"
              value={image}
              placeholder="Paste Image URL here..."
              onChange={imagechangehandler}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={submitHandler}>
          Update Profile
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ProfileUpdate;
