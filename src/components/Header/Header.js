import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { setAuthData, setLocallyStored } from "../../redux/Authentication/auth.actions";

function Header() {
  // use the redux redux state to check if user is logged in or not
  // and based on that show the required navbar
  const authData = useSelector(state => state.authState.data)

  const dispatch = useDispatch()
    // Doing this This will cause infinite loop re-renders because state is updating
    //   if(authData){
    //     setUserInfo(JSON.parse(localStorage.getItem("user-info")))
    //   }

  const history = useHistory();

  function logOut() {
    localStorage.clear();
    dispatch(setLocallyStored(false))
    dispatch(setAuthData(null))

    // history.push("/register");
  }
  
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Login</Navbar.Brand>
        <Nav className="mr-auto navbar_warapper">
          {authData ? (
            <>
              <Link to="/connect">Connection Page</Link>
              <Link to="/userlist">User List</Link>
              <Link to="/add">Add Product</Link>
              <Link to="/clist">Connected With</Link>
              <Link to="/appointments">Appointments</Link>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </Nav>
        {authData ? (
          <Nav>
            <NavDropdown title={authData && authData.name}>
              <NavDropdown.Item onClick={logOut}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        ) : null}
      </Navbar>
    </div>
  );
}

export default Header;
