import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ExpenseItem from "./ExpenseItem";
import { Provider } from "react-redux";
import store from "../../store";

test('searching for app text', () => {
    render(<Provider store={store}><ExpenseItem/></Provider>);

    const exptst = screen.getByText('Expense details');
    expect(exptst).toBeInTheDocument();
});
