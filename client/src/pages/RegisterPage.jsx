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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const registerUser = async (e) => {
    e.preventDefault();
    const userData = input;
    try {
      const res = await axios.post("/register", userData);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="xl:px-20 px-10 grow flex justify-around items-center mb-40">
      <div>
        <h1 className="text-4xl text-center my-4">Register</h1>
        <form
          action=""
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
              type="password"
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
