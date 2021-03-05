import Ingredient from "./Ingredient";
import OrderButton from "./OrderButton";

const Control = (props) => {
  const ingredients = props.burger.map((ingr, idx) => {
    return (
      <Ingredient
        key={idx}
        name={ingr.name}
        qty={ingr.quantity}
        plus={props.addIngredient}
        minus={props.removeIngredient}
      />
    );
  });

  return (
    <div className="controlsContainer">
      <div className="controlTotal">
        Total: <strong>{props.total.toFixed(2)} RSD</strong>
      </div>
      {ingredients}
      <OrderButton showModal={props.showModal} />
    </div>
  );
};

export default Control;
