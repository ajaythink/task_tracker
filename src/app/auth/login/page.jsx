"use client";
import Input from "@/app/components/input";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const defaultData = {
  username: "",
  password: "",
};
const Login = () => {
  const [data, setData] = useState(defaultData);
  const [error, setError] = useState(null);
  const router = useRouter();

  const onValueChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value }); // this will set the value of the input field to the state variable
  };

  const onLogin = async (e) => {
    e.preventDefault();
    setError(null);
    
    const trimmedUsername = data.username.trim();
    const trimmedPassword = data.password.trim();

    console.log("Login data:", data);
    if (!trimmedUsername || !trimmedPassword) {
      setError("Please fill all the fields");
      return;
    }
    try {
      const response = await axios.post("/api/users/login", data);

      setData(defaultData);
      if (response.status === 200) {
        alert("Login successfully");
        router.push("/dashboard/profile");
      }
    } catch (error) {
      // console.error("Error logging in:", error);
      // console.log(error);
      // if (error.response && error.response.status === 400) {
      //   setError(error.response.data.message);
        // router.push("/auth/login");
      // } else {
      //   setError("Login failed, try again." + error.response.data.message);
      // }
      const errorMsg = error.response?.data?.message || "Login failed, Please check your credentials.";
      setError(errorMsg);
    }
  };
  return (
    <>
      <div className="min-h-screen bg-green-400 flex justify-center items-center">
        <div className="bg-white px-6 pt-8 pb-12 mb-4">
          <h1 className="text-3xl text-center">Login</h1>
          <form>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <Input
              label="Username"
              id="username"
              type="text"
              value={data.username}
              onChange={(e) => onValueChange(e)}
            />
            <Input
              label="Password"
              id="password"
              type="password"
              value={data.password}
              onChange={(e) => onValueChange(e)}
            />
            <button
              className="text-white bg-blue-500 hover:bg-blue-700 rounded-full w-full p-2"
              onClick={(e) => onLogin(e)}
            >
              Submit
            </button>
            <p className="pt-4 text-center">
              Don't have an account?{" "}
              <Link
                href={"/auth/register"}
                className="hover:underline text-blue-500"
              >
                {" "}
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};
export default Login;
