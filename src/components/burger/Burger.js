import BurgerIngredients from "./BurgerIngredients";

const Burger = ({ burger }) => {
  const ingrArray = [];
  burger.forEach((b) => {
    for (let index = 0; index < b.quantity; index++) {
      ingrArray.push(b.name);
    }
  });

  const ingr = ingrArray.map((ing, idx) => {
    return <BurgerIngredients key={idx} classes={ing} />;
  });

  return (
    <div className="Burger">
      <BurgerIngredients classes="BreadTop" />
      {ingr}
      <BurgerIngredients classes="BreadBottom" />
    </div>
  );
};

export default Burger;
