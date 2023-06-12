import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="xl:px-20 px-10 grow flex justify-around items-center mb-40">
      <div>
        <h1 className="text-4xl text-center my-4">Login</h1>
        <form action="" method="post" className="mx-auto max-w-md text-center">
          <input type="email" placeholder="Your Email" />
          <input type="password" placeholder="Password" />
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
