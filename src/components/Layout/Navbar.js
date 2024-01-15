import React from "react";
import { Navbar, Button, Dropdown } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import { themeActions } from "../../store/theme";
const NavbarComponent = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector((state) => state.auth.token);
  const darkmode = useSelector((state) => state.theme.darkmode);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const totalExpenses = useSelector((state) => state.expense.totalExpenses);
  const isPremium = useSelector((state) => state.auth.isPremium);
  const exparray = useSelector((state) => state.expense.expenses);
  const verificationHandler = async () => {
    try {
      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.REACT_APP_AUTH_KEY}`,
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: token,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error.message || "Something went wrong!");
      } else {
        alert("please check your email to verify");
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  const logoutHandler = () => {
    dispatch(authActions.logout());
    history.replace("/login");
  };
  const premiumHandler = () => {
    if (!isPremium) {
      dispatch(authActions.premium());
    } else {
      dispatch(themeActions.toggleTheme());
    }
  };
  const convertToCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      exparray.map((expense) => Object.values(expense).join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "expenses.csv");
    document.body.appendChild(link);
    link.click();
  };
  return (
    <Navbar
      style={{
        height: "5rem",
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: darkmode ? "black" : "#092738",
        zIndex: "10",
        position: "fixed",
        left: "0",
        top: "0",
        width: "100%",
      }}
    >
      <Navbar.Brand
        style={{
          fontWeight: "800",
          marginLeft: "2rem",
          color: "white",
        }}
      >
        Expense Tracker
      </Navbar.Brand>
      {isLoggedIn && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginRight: "3rem",
          }}
        >
          {(totalExpenses > 10000 || isPremium) && (
            <Button style={{ margin: "2px 5px" }} onClick={premiumHandler}>
              {isPremium ? "Change Theme" : "Activate Premium"}
            </Button>
          )}
          {isPremium && (<Button onClick={convertToCSV}>Download Report</Button>)}
          

          <Dropdown style={{ margin: "3px 6px" }}>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              Profile
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={props.onshowmodal}>
                Update Profile
              </Dropdown.Item>
              <Dropdown.Item onClick={verificationHandler}>
                Verify email
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Button onClick={logoutHandler} style={{ margin: "2px 5px" }}>
            Logout
          </Button>
        </div>
      )}
    </Navbar>
  );
};

export default NavbarComponent;
