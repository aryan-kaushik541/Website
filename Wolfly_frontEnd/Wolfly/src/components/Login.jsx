import React from "react";
import LoginForm from "./LoginForm";

// Importing the image correctly
import LoginBackground from '../Images/Login.png'; // Ensure this path is correct

const Login = () => {
  return (
    <>
      <div
        className="flex items-center justify-center py-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${LoginBackground})` }} // Using the imported image for background
      >
        <LoginForm />
      </div>
    </>
  );
};

export default Login;
