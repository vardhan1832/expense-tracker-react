import SignUp from "./screens/Signup";
import Login from './screens/Login'
import ExpenseTracker from "./components/Expense/ExpenseTracker";
import ProfileUpdate from './components/ProfileUpdate'
import ForgotPassword from "./screens/ForgotPassword";
import NavbarComponent from "./components/Layout/Navbar";
import "./App.css";
import React, {useState} from "react";
import { Route, Switch , Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";

function App() {
  const auth = useSelector(state=>state.auth.isLoggedIn)
  const [modalShow, setModalShow] = useState(false);
  const modalHandler = () =>{
    setModalShow(true)
  }
  return (
    <React.Fragment>
    <NavbarComponent  onshowmodal = {modalHandler}/>
    <Switch>
      <Route path="/" exact>
        {!auth && <SignUp />}
        {auth && <Redirect to='/expenses'/>}   
      </Route>
      <Route path="/login">
        {!auth && <Login />}
        {auth && <Redirect to='/expenses'/>} 
      </Route>
      <Route path="/expenses">
        {auth && <ExpenseTracker/>}
        {!auth && <Redirect to='/login'/>}
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
