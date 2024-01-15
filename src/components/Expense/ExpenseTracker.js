import React, { useState, useRef, useEffect } from "react";
import { Button, Form, FloatingLabel } from "react-bootstrap";
import "./ExpenseTracker.css";
import ExpenseList from "./ExpenseList";
import { useSelector, useDispatch } from "react-redux";
import { expenseActions } from "../../store/expense";
import { authActions } from "../../store/auth";
const ExpenseTracker = () => {
  const dispatch = useDispatch();
  const expenseref = useRef();
  const descref = useRef();
  const categoryref = useRef();
  const [isEditing, setisEditing] = useState(false);
  const [editingId, seteditingId] = useState("");
  const exparray = useSelector((state) => state.expense.expenses);
  const email = localStorage.getItem("email");
  const darkmode = useSelector((state) => state.theme.darkmode);
  useEffect(() => {
    const fetchexpenses = async () => {
      try {
        if (email) {
          let modifiedEmail = email.replace(/[@.]/g, "");
          const res = await fetch(
            `https://exp-tracker-react-9867a-default-rtdb.firebaseio.com/expenses/${modifiedEmail}.json`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );
          const data = await res.json();
          if (!res.ok) {
            throw new Error(data.error.message);
          } else {
            console.log(data)
            const array = [];
            for (let [key, value] of Object.entries(data)) {
              array.push({ id: key, ...value });
            }
            dispatch(expenseActions.addNewExpense([...array.reverse()]));
            console.log(array);
          }
        } else {
          alert("please login again");
          dispatch(authActions.logout())
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchexpenses();
  }, [dispatch,email]);
  const submithandler = async (e) => {
    e.preventDefault();
    try {
      if (email) {
        let modifiedEmail = email.replace(/[@.]/g, "");
        const obj = {
          amount: expenseref.current.value,
          description: descref.current.value,
          category: categoryref.current.value,
        };
        let apiforedit = isEditing ? `/${editingId}` : "";
        const res = await fetch(
          `https://exp-tracker-react-9867a-default-rtdb.firebaseio.com/expenses/${modifiedEmail}${apiforedit}.json`,
          {
            method: isEditing ? "PUT" : "POST",
            body: JSON.stringify(obj),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error.message);
        } else {
          if (isEditing) {
            let newarray = [...exparray];
            let updatedexpenseindex = newarray.findIndex(
              (ele) => ele.id === editingId
            );
            const updatedExpense = {
              id: editingId,
              amount: expenseref.current.value,
              description: descref.current.value,
              category: categoryref.current.value,
            };

            // Update the array with the new object
            newarray[updatedexpenseindex] = updatedExpense;
            dispatch(expenseActions.addNewExpense([...newarray]));
            setisEditing(false);
            seteditingId("");
            expenseref.current.value = "";
            descref.current.value = "";
            categoryref.current.value = "";
          } else {
            dispatch(
              expenseActions.addNewExpense([
                { id: data.name, ...obj },
                ...exparray,
              ])
            );
            expenseref.current.value = "";
            descref.current.value = "";
            categoryref.current.value = "";
          }
        }
      } else {
        alert("please login again");
        dispatch(authActions.logout())
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  const edithandler = (id) => {
    setisEditing(true);
    seteditingId(id);
    let indexOfExpenseToUpdate = exparray.findIndex((ele) => {
      return ele.id === id;
    });
    expenseref.current.value = exparray[indexOfExpenseToUpdate].amount;
    descref.current.value = exparray[indexOfExpenseToUpdate].description;
    categoryref.current.value = exparray[indexOfExpenseToUpdate].category;
    alert("Plese Edit your expense");
  };
  const deletehandler = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure to delete this Expense?"
    );
    if (confirmDelete) {
      try {
        if (email) {
          let modifiedEmail = email.replace(/[@.]/g, "");
          const res = await fetch(
            `https://exp-tracker-react-9867a-default-rtdb.firebaseio.com/expenses/${modifiedEmail}/${id}.json`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data = await res.json();
          if (!res.ok) {
            throw new Error(data.error.message);
          } else {
            dispatch(
              expenseActions.addNewExpense([
                ...exparray.filter((x) => x.id !== id),
              ])
            );
          }
        } else {
          alert("please login again");
          dispatch(authActions.logout())
        }
      } catch (err) {
        console.log(err.message);
      }
    }
  };
  return (
    <div className={darkmode?'bg':'wbg'}>
      <div className="main-image">
        <img
          src="https://images.pexels.com/photos/157520/pexels-photo-157520.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="Expemses"
        ></img>
      </div>
      <Form className={darkmode?'form__expense_dark':"form__expense"} onSubmit={submithandler}>
        <h2
          style={{
            textAlign: "center",
            fontFamily: "fantasy",
            marginBottom: "2rem",
            color: "white",
          }}
        >
          Expense
        </h2>
        <Form.Group className="mb-3" controlId="formBasicExpense">
          <Form.Control
            type="number"
            placeholder="Enter your expense"
            ref={expenseref}
            required
          />
        </Form.Group>
        <FloatingLabel
          className="mb-3"
          controlId="floatingTextarea2"
          label="Describe your expense"
        >
          <Form.Control
            as="textarea"
            placeholder="Describe your expense"
            style={{ height: "100px" }}
            ref={descref}
            required
          />
        </FloatingLabel>
        <Form.Group className="mb-3" controlId="formBasicCategory">
          <Form.Select
            aria-label="Default select example"
            ref={categoryref}
            required
          >
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
          {isEditing ? "Update Expense" : "Add Expense"}
        </Button>
      </Form>
      <ExpenseList
        items={exparray}
        edithandler={edithandler}
        deletehandler={deletehandler}
      />
    </div>
  );
};

export default ExpenseTracker;
