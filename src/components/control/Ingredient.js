const Ingredient = (props) => {
  return (
    <div className="ingredient">
      <div className="ingredientName">
        {props.name}
        <span>{props.qty}</span>
      </div>
      <div className="ingredientControl">
        <button onClick={() => props.minus(props.name)}> - </button>
        <button onClick={() => props.plus(props.name)}> + </button>
      </div>
    </div>
  );
};

export default Ingredient;
