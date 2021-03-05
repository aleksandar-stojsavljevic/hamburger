import { useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const Checkout = (props) => {
  let burgerUser = JSON.parse(localStorage.getItem("burgerUser"));

  let [user, setUser] = useState({
    payMethod: "card",
    userId: burgerUser.localId,
  });

  const handleChange = (e) => {
    let sum = { ...user };
    sum[e.target.name] = e.target.value;

    const valid = validateForm(e.target.name, e.target.value);
    if (!valid) {
      e.target.setAttribute("class", "error");
    } else {
      e.target.setAttribute("class", "");
    }
    setUser(sum);
  };

  const validateForm = (name, value) => {
    let v = true;
    if (name == "name" || name == "phone" || name == "address") {
      if (value == "") {
        v = false;
      }
    }
    if (name == "email") {
      var re = /\S+@\S+\.\S+/;
      if (!re.test(value)) {
        v = false;
      }
    }
    return v;
  };

  const history = useHistory();

  let url = history.location.search;
  let order = {};
  url = url.replace("?", "");
  url = url.split("&");
  let burger = {};
  url.forEach((e) => {
    let el = e.split("=");
    const key = el[0];
    const value = el[1];
    if (key != "total") {
      burger[key] = value;
    } else {
      order[key] = value;
    }
  });
  order.burger = burger;

  const submitForm = (e) => {
    e.preventDefault();
    let total = {
      ...user,
      ...order,
    };
    axios
      .post(
        "https://burgershop-256a4-default-rtdb.europe-west1.firebasedatabase.app/orders.json?auth=" +
          burgerUser.idToken,
        total
      )
      .then(() => {
        setUser({});
        document.querySelector("form").reset();
        props.resetBurgerIngredients();
        history.push("/orders");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="form">
      <form onSubmit={submitForm}>
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            name="phone"
            placeholder="Enter your phone"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            placeholder="Enter your address"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="payMethod">Pay Method</label>
          <select name="payMethod" onChange={(e) => handleChange(e)}>
            <option value="card">Pay with card</option>
            <option value="cash">Pay with cash</option>
          </select>
        </div>
        <input type="submit" value="Send Order" className="order-btn" />
      </form>
    </div>
  );
};

export default Checkout;
