import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const [input, setInput] = useState({
    fname: "",
    lname: "",
    email: "",
    pass: "",
  });
  const [cPass, setCPass] = useState("");
  const [isShown, setIsShown] = useState(false)
  const [msg, setMsg] = useState("");

  let status = {}

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const registerUser = async (e) => {
    e.preventDefault();
    const userData = input;
    if (Object.values(userData).some(x=> x === "")) {
      status = {error: true, msg: "Please fill in all the feilds."}
    } else if (userData.pass !== cPass) {
      status = {error: true, msg: "Passwords do not match, please try again."}
    } else {
      try {
        const res = await axios.post("/register", userData);
        console.log(res.data);
        status = {error: false, msg: "Successfully Registered"}
      } catch (error) {
        console.error(error);
        status = {error: true, msg: "Registration Failed. Please try again"}
      }
      // console.log(msg);
    }
    setIsShown(true)
    setMsg(status);
  };

  return (
    <div className="xl:px-20 px-10 grow flex justify-around items-center mb-40">
      <div>
        <h1 className="text-4xl text-center my-4">Register</h1>
        <form
          method="post"
          className="mx-auto max-w-md text-center"
          onSubmit={registerUser}
          >
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="First Name"
              name="fname"
              value={input.fname}
              onChange={handleChange}
              />
            <input
              type="text"
              placeholder="Last Name"
              name="lname"
              value={input.lname}
              onChange={handleChange}
              />
          </div>
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
          <input
            type="password"
            placeholder="Confirm Password"
            name="cpass"
            value={cPass}
            onChange={(e) => setCPass(e.target.value)}
            />
            {isShown && 
            <div className={`w-full p-3 mb-2 rounded-2xl ${msg.error?"bg-red-900":"bg-green-900"}`}>
            {msg.msg}
            </div>}
          <button className="primary">Continue</button>
          <div className="mt-2">
            Already have an account?{" "}
            <Link to="/login" className="underline font-semibold">
              Login Here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
