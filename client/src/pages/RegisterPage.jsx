import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <div className="xl:px-20 px-10 grow flex justify-around items-center mb-40">
      <div>
        <h1 className="text-4xl text-center my-4">Register</h1>
        <form action="" method="post" className="mx-auto max-w-md text-center">
          <div className="flex gap-2">
            <input type="text" placeholder="First Name" />
            <input type="password" placeholder="Last Name" />
          </div>
          <input type="email" placeholder="Your Email" />
          <input type="password" placeholder="Password" />
          <input type="password" placeholder="Confirm Password" />
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
