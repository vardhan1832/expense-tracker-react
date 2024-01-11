import React, { useRef } from "react";
import { Container, Form , Button  } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const ProfileUpdate = () => {
    const history = useHistory()
  const nameref = useRef();
  const imageurlref = useRef();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.REACT_APP_AUTH_KEY}`,
        {
          method: "POST",
          body: JSON.stringify({
            idToken: localStorage.getItem("token"),
            displayName: nameref.current.value,
            photoUrl: imageurlref.current.value,
            returnSecureToken: true,
          }),
          headers:{
            "Content-Type": "application/json"
          }
        }
      )
      const data = await res.json()
      if(!res.ok){
        throw new Error(data.error.message);
      }else{
        alert('Profile updated successfully!')
        history.replace('/expenses')
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <Container>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Name" ref={nameref} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Image Url</Form.Label>
          <Form.Control type="text" placeholder="Paste Image URL here..." ref={imageurlref} />
        </Form.Group>
        <Button type="submit">Update Profile</Button>
      </Form>
    </Container>
  );
};
export default ProfileUpdate;
