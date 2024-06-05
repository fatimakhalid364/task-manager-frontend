import React from "react";
import signUpFrame from "../.././assets/Frame 3289.svg";
import BackToSite from "./back-to-site.jsx";
import CreateAccountForm from "./signup-form.jsx";

function Signup() {
  return (
    <div className='signup-div'>
      <aside className='signup-sidecontent'>
        <img className='signup-image' src={signUpFrame} alt='sign up frame' />
      </aside>
      <main>
        <BackToSite />
        <CreateAccountForm currentScreen={"SIGNIN"} />
      </main>
    </div>
  );
}

export default Signin;
