const OrderButton = (props) => {
  return (
    <div className="OrderButton">
      <button onClick={() => props.showModal()}>Order now</button>
    </div>
  );
};

export default OrderButton;
