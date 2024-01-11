import SignUp from "./components/Signup";
import Login from "./components/Login";
import ExpenseTracker from "./components/ExpenseTracker";
import ProfileUpdate from "./components/ProfileUpdate";
import "./App.css";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <SignUp />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/expenses">
        <ExpenseTracker/>
      </Route>
      <Route path='/profile'>
        <ProfileUpdate/>
      </Route>
    </Switch>
  );
}

export default App;
