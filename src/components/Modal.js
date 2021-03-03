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
          <Link to={link} onClick={onPass}>
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Modal;
