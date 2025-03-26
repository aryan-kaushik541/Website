import React from "react";
import Footer from "./Footer";
import SignUpForm from "./SignUpForm";

const Signup = () => {
  return (
    <>
      <div className="flex items-center justify-center py-12 bg-[url('D:\Backend-eCommerce\frontend\src\Images\SignUp.png')] bg-cover bg-center">
      <SignUpForm />
      </div>
      <Footer />
    </>
  );
};

export default Signup;
