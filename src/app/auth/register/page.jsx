"use client";
import { useState } from "react";
import Input from "@/app/components/input";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
const defaultData = {
  name: "",
  username: "",
  password: "",
};

export default function Register() {
  const [data, setData] = useState(defaultData);
  const [error, setError] = useState(null);
  const Router = useRouter();

  const onValueChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onRegister = async (e) => {
    e.preventDefault();

    console.log(`all data here: ${JSON.stringify(data)}`);
    if (!data.name || !data.username || !data.password) {
      setError("Please fill all the fields");
      return;
    } else {
      setError(null);
      // alert("Registered successfully");
    }

    try {
      const response = await axios.post("/api/users/register", data);
      setData(defaultData);
      if (response.status === 200) {
        alert("Registered successfully second");
        Router.push("/auth/login");
      } else {
        alert(response.data || "Registration failed. Please try again." );
      }
    } catch (error) {

      if(error.response && error.response.status === 400){
        alert(error.response.data); 
        Router.push("/auth/login");
      }else{
        alert("Registration failed. Please try again.");
      }

      // console.error("Error registering user:", error);
      // setError("Registration failed. Please try again.");
    }
  };
  return (
    <>
      <div className="min-h-screen bg-green-400 flex justify-center items-center">
        <div className="bg-white px-6 pt-8 pb-12 mb-4">
          <h1 className="text-3xl text-center">Register</h1>
          {/* <form onSubmit={(e) => onRegister(e)}> */}
          <form>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <Input
              label="Name"
              id="name"
              type="text"
              value={data.name}
              onChange={(e) => onValueChange(e)}
            />
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
              className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-full w-full"
              onClick={(e) => onRegister(e)}
            >
              Submit
            </button>
            <p className=" pt-4 text-center">
              Already have an account?{" "}
              <Link
                href={"/auth/login"}
                className="hover:underline text-blue-500"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
