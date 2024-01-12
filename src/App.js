import SignUp from "./screens/Signup";
import Login from './screens/Login'
import ExpenseTracker from "./components/Expense/ExpenseTracker";
import ProfileUpdate from './components/ProfileUpdate'
import ForgotPassword from "./screens/ForgotPassword";
import NavbarComponent from "./components/Layout/Navbar";
import "./App.css";
import React, {useState} from "react";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  const [modalShow, setModalShow] = useState(false);
  const modalHandler = () =>{
    setModalShow(true)
  }
  return (
    <React.Fragment>
    <NavbarComponent  onshowmodal = {modalHandler}/>
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
      <Route path='/forgotpassword'>
        <ForgotPassword/>
      </Route>
    </Switch>
    <ProfileUpdate show={modalShow} onhide={()=>setModalShow(false)}/>
    </React.Fragment>
  );
}

export default App;
