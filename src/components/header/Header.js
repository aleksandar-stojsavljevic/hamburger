import burgerLogo from "../../assets/burger.svg";
import Navigation from "../Navigation";

const Header = (props) => {
  return (
    <header>
      <div className="logo">
        <img src={burgerLogo} alt="burger logo" />
      </div>
      <Navigation />
      <div className="hidden">
        <img
          className="ham-img"
          src={props.icon}
          alt="ham menu"
          onClick={props.toogleHamMenu}
        />
      </div>
    </header>
  );
};

export default Header;
