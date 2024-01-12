import React , {useState , useRef, useEffect} from "react";
import { Button, Form,  FloatingLabel } from "react-bootstrap";
import "./ExpenseTracker.css";
import ExpenseList from "./ExpenseList";

const ExpenseTracker = () => { 
  const expenseref = useRef()
  const descref = useRef()
  const categoryref = useRef()
  const [exparray , setexparray] = useState([])
  useEffect(()=>{
    const fetchexpenses = async () =>{
      try{
        const res = await fetch('https://exp-tracker-react-9867a-default-rtdb.firebaseio.com/expenses.json',{
          method : 'GET',
          headers:{'Content-Type':'application/json'}
        })
        const data = await res.json()
        if(!res.ok){
          throw new Error(data.error.message)
        }else{
          const array = []
          for(let [key , value] of Object.entries(data)){
            array.push({id:key,...value})
          }
          setexparray([...array.reverse()])
          console.log(array)
        }
      }catch(err){
        console.log(err.message)
      }
    }
    fetchexpenses()
  },[])
  const submithandler =async (e) =>{
    e.preventDefault();
    try{
      const obj = {
        amount:expenseref.current.value,
        description:descref.current.value,
        category:categoryref.current.value
      }
      const res = await fetch(`https://exp-tracker-react-9867a-default-rtdb.firebaseio.com/expenses.json`,{
        method:"POST",
        body:JSON.stringify(obj),
        headers:{
          'Content-Type':'application/json'
        }
      })
      const data = await res.json()
      if(!res.ok){
        throw new Error(data.error.message)
      }else{
        setexparray(arr=>{
          return [{id:data.name,...obj},...arr]
        })
        // console.log(data.name)
      }
    }catch(err){
      console.log(err.message)
    }
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
            <option disabled>Select Category</option>
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
