import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const Signin = () => {
  let [user, setUser] = useState({});
  let [errormsg, setErrormsg] = useState("");

  const handleChange = (e) => {
    let tempUser = { ...user };
    const valid = validateForm(e.target.name, e.target.value);
    if (!valid) {
      e.target.setAttribute("class", "error");
    } else {
      e.target.setAttribute("class", "");
      tempUser[e.target.name] = e.target.value;
    }
    setUser(tempUser);
    setErrormsg("");
  };

  const validateForm = (name, value) => {
    let v = true;
    if (name == "pass") {
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
  const submitForm = (e) => {
    e.preventDefault();
    const data = {
      email: user.email,
      password: user.pass,
      returnSecureToken: true,
    };
    axios
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`,
        data
      )
      .then((result) => {
        let expTime = +new Date().getTime() / 1000 + +result.data.expiresIn;
        let loginData = {
          email: result.data.email,
          expiresIn: result.data.expiresIn,
          idToken: result.data.idToken,
          localId: result.data.localId,
          refreshToken: result.data.refreshToken,
          expTime: expTime,
        };
        localStorage.setItem("burgerUser", JSON.stringify(loginData));
        history.push("/");
        window.location.reload(); // retardirano resenje
      })
      .catch((error) => {
        const tmpMsg = (
          <div className="errormsg">{error.response.data.error.message}</div>
        );
        setErrormsg(tmpMsg);
      });
  };

  return (
    <div className="form">
      <form onSubmit={submitForm}>
        {errormsg}
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
          <label htmlFor="pass">Password</label>
          <input
            type="password"
            name="pass"
            placeholder="Enter your password"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <input type="submit" value="Sign In" className="order-btn" />
      </form>
    </div>
  );
};

export default Signin;
