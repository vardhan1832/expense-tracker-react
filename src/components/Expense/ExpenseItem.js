import React, { useState } from "react";
import "./ExpenseItem.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
function ExpenseItem(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const edithandler = () =>{
    props.edithandler(props.id)
    setShow(false)
  }
  const deletehandler = ()=>{
    props.deletehandler(props.id)
    setShow(false)
  }
  return (
    <div className="expense-item__description">
      <div style={{ display: "flex", marginLeft: "1rem" }}>
        <h4 style={{ marginTop: "3px" }}>Expense:</h4>
        <div className="expense-item__price"> ${props.amount}</div>
      </div>
      <Button variant="primary" onClick={handleShow}>
        Expense details
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.category}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.description}</Modal.Body>
        <Modal.Footer>
          <div style={{ display: "flex", marginLeft: "1rem" }}>
            <h4 style={{ marginTop: "3px" }}>Expense:</h4>
            <div className="expense-item__price"> ${props.amount}</div>
          </div>
          <Button variant="secondary" onClick={edithandler}>
            Edit 
          </Button>
          <Button variant="primary" onClick={deletehandler}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ExpenseItem;
