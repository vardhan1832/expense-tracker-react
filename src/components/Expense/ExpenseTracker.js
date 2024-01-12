import React , {useState , useRef} from "react";
import { Button, Form,  FloatingLabel } from "react-bootstrap";
import "./ExpenseTracker.css";
import ExpenseList from "./ExpenseList";

const ExpenseTracker = () => { 
  const expenseref = useRef()
  const descref = useRef()
  const categoryref = useRef()
  const [exparray , setexparray] = useState([])
  const submithandler = (e) =>{
    e.preventDefault();
    const obj = {
      id:Math.random(),
      amount:expenseref.current.value,
      description:descref.current.value,
      category:categoryref.current.value
    }
    setexparray(arr=>{
      return [obj,...arr]
    })
    console.log(exparray)
  }
  return (
    <React.Fragment>
      <div className="main-image">
        <img src='https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=600' alt="Expemses"></img>
      </div>
      <Form className="form__expense" onSubmit={submithandler}>
        <h2
          style={{
            textAlign: "center",
            fontFamily: "fantasy",
            marginBottom: "2rem",
            color:'white'
          }}
        >
          Expense
        </h2>
        <Form.Group className="mb-3" controlId="formBasicExpense">
          <Form.Control type="number" placeholder="Enter your expense" ref={expenseref} required />
        </Form.Group>
        <FloatingLabel className="mb-3" controlId="floatingTextarea2" label="Describe your expense">
        <Form.Control
          as="textarea"
          placeholder="Describe your expense"
          style={{ height: '100px'}}
          ref={descref}
          required
        />
      </FloatingLabel>
        <Form.Group className="mb-3" controlId="formBasicCategory">
          <Form.Select aria-label="Default select example" ref={categoryref} required>
            <option disabled selected>Select Category</option>
            <option value="Education">Education</option>
            <option value="Fees">Fees</option>
            <option value="Medical">Medical</option>
            <option value="Fuel">Fuel</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Food">Food</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Expense
        </Button>
      </Form>
      <ExpenseList items={exparray}/>
    </React.Fragment>
  );
};

export default ExpenseTracker;
