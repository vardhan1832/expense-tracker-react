import React from "react";
import ExpenseItem from "./ExpenseItem";
import './ExpenseList.css'

const ExpenseList = (props) => {
  if (props.items.length === 0) {
    return <h2 className="expenses-list__fallback">No Expenses Found !!</h2>;
  }

  if (props.items.length > 0) {
    return (
      <ul className="expenses-list">
        {props.items.map((expenses) => {
          return (
            <ExpenseItem
              key={expenses.id}
              id={expenses.id}
              amount={expenses.amount}
              description={expenses.description}
              category={expenses.category}
              edithandler={(id)=>props.edithandler(id)}
              deletehandler={(id)=>props.deletehandler(id)}
            />
          );
        })}
      </ul>
    );
  }
};

export default ExpenseList;