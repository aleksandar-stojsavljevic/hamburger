import { NavLink } from "react-router-dom";
const Navigation = () => {
  return (
    <nav>
      <NavLink exact to="/">
        BurgerBuilder
      </NavLink>
      <NavLink to="/orders">Orders</NavLink>
    </nav>
  );
};

export default Navigation;
