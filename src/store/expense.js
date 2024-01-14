import { createSlice } from "@reduxjs/toolkit";

const initialExpensesState = {
    expenses: [],
    totalExpenses: 0
}

const expenseSlice = createSlice({
    name: "expenses",
    initialState: initialExpensesState,
    reducers: {
        addNewExpense: (state, action) =>{
            state.expenses = [...action.payload]
            state.totalExpenses = action.payload.reduce((sum,ele)=>{
                return sum + Number(ele.amount)
            },0)
        }
    }
})

export const expenseActions = expenseSlice.actions
export const expenseReducer = expenseSlice.reducer