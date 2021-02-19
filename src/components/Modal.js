const Modal = (props) => {
  const ingredients = props.burger.map((i, idx) => {
    return (
      <li key={idx}>
        <span>{i.name}</span> <span>Qty:{i.quantity}</span>
      </li>
    );
  });

  return (
    <div className="modal">
      <div className="rel">
        <a href="#" onClick={props.closeModal}>
          <strong>X</strong>
        </a>
        <h2>Order details</h2>
        <ul>{ingredients}</ul>
        <h3>Total: {props.total.toFixed(2)} RSD</h3>
      </div>
    </div>
  );
};

export default Modal;
