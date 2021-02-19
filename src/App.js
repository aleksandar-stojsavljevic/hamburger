import "./App.css";
import Burger from "./components/burger/Burger";
import { useState } from "react";
import Control from "./components/control/Control";
import Cover from "./components/Cover";
import Modal from "./components/Modal";
import Header from "./components/header/Header";
import MobileMenu from "./components/MobileMenu";
import hamMenu from "./assets/hamMenu.svg";
import closeIcon from "./assets/close-icon.png";
function App() {
  const [menu, setMenu] = useState(false);
  const icon = menu ? closeIcon : hamMenu;

  const toogleHamMenu = () => {
    setMenu(!menu);
  };

  const [burger, setBurger] = useState([
    {
      name: "Meat",
      price: 120.0,
      quantity: 0,
    },
    {
      name: "Salad",
      price: 20.0,
      quantity: 0,
    },
    {
      name: "Bacon",
      price: 100.1,
      quantity: 0,
    },
    {
      name: "Cheese",
      price: 74.88,
      quantity: 0,
    },
  ]);

  let total = 0;
  burger.forEach((i) => {
    total += i.price * i.quantity;
  });

  const [modal, setModal] = useState(false);

  const addIngredient = (ingredient) => {
    const newBurger = burger.map((ingr) => {
      if (ingr.name == ingredient) {
        ingr.quantity++;
      }
      return ingr;
    });
    setBurger(newBurger);
  };

  const removeIngredient = (ingredient) => {
    const newBurger = burger.map((ingr) => {
      if (ingr.name == ingredient && ingr.quantity > 0) {
        ingr.quantity--;
      }
      return ingr;
    });
    setBurger(newBurger);
  };

  const showModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  return (
    <div className="App">
      {menu && <MobileMenu />}
      {modal && (
        <div>
          <Cover closeModal={closeModal} />
          <Modal burger={burger} total={total} closeModal={closeModal} />
        </div>
      )}
      <Header icon={icon} toogleHamMenu={toogleHamMenu} />

      <Burger burger={burger} />
      <Control
        burger={burger}
        total={total}
        addIngredient={addIngredient}
        removeIngredient={removeIngredient}
        showModal={showModal}
      />
    </div>
  );
}

export default App;
