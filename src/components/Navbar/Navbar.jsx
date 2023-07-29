import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav className="navbar">
    <img className="logo_image" src="https://i.ibb.co/khnH7g9/logo-1.png" alt="PhotoHub" />
      

      {isLoggedIn && (
        <>
        <Link to="/feed">
            <button className="button">Feed</button>
          </Link>
          

          <Link to="/profile">
            <button className="button">Profile</button>
            {/* <img src="https://picsum.photos/id/402/200/300" style={{ width: 50, height: 50, borderRadius: 25}} alt="profile" /> */}
          </Link>
          
          <Link to="/login">
          <button className="button" onClick={logOutUser}>Logout</button>
          </Link>
          

          <span className="User">{user && user.name}</span>
        </>
      )}

      {!isLoggedIn && (
        <>
        <Link to="/">
            <button className="button">Home</button>
          </Link>
          
          <Link to="/signup">
            {" "}
            <button className="button">Sign Up</button>{" "}
          </Link>
          <Link to="/login">
            {" "}
            <button className="button">Login</button>{" "}
          </Link>
        </>
      )}
      
    </nav>
  );
}

export default Navbar;
