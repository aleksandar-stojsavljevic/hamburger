import { NavLink, useHistory } from "react-router-dom";
const Navigation = () => {
  const history = useHistory();
  let signedIn = false;
  if (localStorage.getItem("burgerUser")) {
    signedIn = true;
  }

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("burgerUser");
    history.push("/");
    window.location.reload(); // retardirano resenje
  };

  return (
    <nav>
      <NavLink exact to="/">
        BurgerBuilder
      </NavLink>

      {signedIn && <NavLink to="/orders">Orders</NavLink>}
      {!signedIn && <NavLink to="/signup">Signup</NavLink>}
      {!signedIn && <NavLink to="/signin">SignIn</NavLink>}
      {signedIn && (
        <NavLink to="/logout" onClick={logout}>
          Logout
        </NavLink>
      )}
    </nav>
  );
};

export default Navigation;
