import { Link, useHistory } from "react-router-dom";

const Modal = (props) => {
  let link = "/checkout?";
  const ingredients = props.burger.map((i, idx) => {
    link += `${i.name}=${i.quantity}&`;
    return (
      <li key={idx}>
        <span>{i.name}</span> <span>Qty:{i.quantity}</span>
      </li>
    );
  });

  link += `total=${props.total}`;

  let history = useHistory();

  const onPass = () => {
    history.push(link);
    props.closeModal();
  };

  const currentTime = new Date().getTime() / 1000;
  const burgerUser = JSON.parse(localStorage.getItem("burgerUser"));
  let button = (
    <Link to="/signin" onClick={() => props.closeModal()}>
      Sign In
    </Link>
  );
  if (burgerUser && burgerUser.expTime >= +currentTime) {
    button = (
      <Link to={link} onClick={onPass}>
        Checkout
      </Link>
    );
  }

  return (
    <div className="modal">
      <div className="rel">
        <a href="#" onClick={props.closeModal}>
          <strong>X</strong>
        </a>
        <h1>Order details</h1>
        <ul>{ingredients}</ul>
        <h2>Total: {props.total.toFixed(2)} RSD</h2>
        <div className="modal-links">
          <Link to="/" onClick={props.closeModal}>
            Cancel
          </Link>
          {button}
        </div>
      </div>
    </div>
  );
};

export default Modal;
