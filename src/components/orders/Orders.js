import axios from "axios";
import { useEffect, useState } from "react";

const Orders = (props) => {
  let [data, setData] = useState({});
  let burgerUser = JSON.parse(localStorage.getItem("burgerUser"));
  useEffect(() => {
    const queryParams = `?auth=${burgerUser.idToken}&orderBy="userId"&equalTo="${burgerUser.localId}"`;
    axios
      .get(
        "https://burgershop-256a4-default-rtdb.europe-west1.firebasedatabase.app/orders.json" +
          queryParams
      )
      .then((result) => {
        setData(result.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const orders = Object.entries(data).map((order, idx) => {
    let ingredients = [];

    for (const i in order[1].burger) {
      ingredients.push(`<span>${i}: ${order[1].burger[i]}</span>`);
    }
    return (
      <div className="checkout-container" key={idx}>
        <div className="order">
          <div className="ingredients">
            <h3>Ingredients:</h3>
            {ingredients.map((i, idx) => {
              return <p key={idx} dangerouslySetInnerHTML={{ __html: i }}></p>;
            })}
          </div>
          <div className="person">
            <h3>Customer:</h3>
            <p>Name: {order[1].name}</p>
            <p>Address: {order[1].address}</p>
            <p>Email: {order[1].email}</p>
            <p>Phone: {order[1].phone}</p>
            <p>
              <strong>Pay Method: {order[1].payMethod}</strong>
            </p>
          </div>
        </div>

        <h2>Total: {parseInt(order[1].total).toFixed(2)}</h2>
      </div>
    );
  });

  return (
    <>
      <div className="orders-title">
        <h1>Orders:</h1>
      </div>
      {orders}
    </>
  );
};

export default Orders;
