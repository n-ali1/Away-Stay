import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const LoginPage = () => {
  const [input, setInput] = useState({ email: "", pass: "" });
  const [msg, setMsg] = useState({});
  const [redirect, setRedirect] = useState(false);
  const {setUser} = useContext(UserContext)


  let status = {};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const loginUser = async (e) => {
    e.preventDefault();
    const userData = input;
    if (Object.values(userData).some((x) => x === "")) {
      status = { error: true, msg: "Please fill in all the feilds." };
    } else {
      try {
        const res = await axios.post("/login", userData);
        setUser(res.data)
        setRedirect(true);
      } catch (error) {
        console.error(error);
        status = { error: true, msg: "Login Failed. Please try again" };
      }
    }
    setMsg(status);
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="xl:px-20 px-10 grow flex justify-around items-center mb-40">
      <div>
        <h1 className="text-4xl text-center my-4">Login</h1>
        <form
          method="post"
          className="mx-auto max-w-md text-center"
          onSubmit={loginUser}
        >
          <input
            type="email"
            placeholder="Your Email"
            name="email"
            value={input.email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="pass"
            value={input.pass}
            onChange={handleChange}
          />
          {msg.error && (
            <div className="w-[28rem] p-2 mb-2 rounded-2xl bg-red-900">
              {msg.msg}
            </div>
          )}
          <button className="primary">Continue</button>
          <div className="mt-2">
            Don&apos;t have an account yet?{" "}
            <Link to="/register" className="underline font-semibold">
              Register Here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
