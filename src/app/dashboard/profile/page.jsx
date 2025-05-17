"use client";

import { useRouter } from "next/navigation";
import axios from "axios";

const Profile = () => {
  const router = useRouter();

  const onLogout = async (e) => {
    e.preventDefault();
    console.log("logout button clicked");
    try {
      const response = await axios.get("/api/users/logout");
      console.log(response);
      if (response.status === 200) {
        router.push("/auth/login");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <>
      <div className="min-h-screen bg-green-400 flex justify-center items-center">
        <div className="bg-white px-6 pt-8 pb-12 mb-4">
          <h1 className="text-3xl text-center">Welcome My Task Tracker App</h1>
          <p>Welcome to personalised dashboard</p>
          <p className="text-center">This is your profile page</p>

          <button
            className="text-white bg-red-500 hover:bg-red-700 rounded-full w-full p-2"
            onClick={(e) => onLogout(e)}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};
export default Profile;
