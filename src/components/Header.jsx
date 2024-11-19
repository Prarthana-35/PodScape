/* eslint-disable no-unused-vars */
import {useState, useContext, useRef} from "react";
import {UserContext} from "../contexts/UserContext";

const Header = ({loggedIn, setLoggedIn, signInButton}) => {
    const [user, setUser] = useContext(UserContext);

    const handleLogOut = () => {
        setLoggedIn(false);
        setUser({});
      }

  return (
    <>
    <div className="flex flex-col items-center">
    <h1 className="text-3xl mt-5 py-2 text-center">React Podcast Player</h1>
    <div id="SignIn"></div>
    {loggedIn ? (
      <>
      <div className="flex flex-row items-center justify-end gap-2 pr-8 py-4"> 
        <img src={user.picture} alt="user profile" className="rounded-full w-10"/>
        <button className="border py-1 px-3 rounded-lg my-2 bg-blue-500 text-white" onClick={handleLogOut}>
         Logout
         </button>
         </div>
         <h1 className="text-3xl text-center"> Hi there,{user.name} !!</h1>
        </>
      ) :(
       <div className="flex flex-row items-center justify-end gap-2 pr-8 py-4">
         <div ref={signInButton}></div>
       </div>
     )}
     <h2 className="text-3xl mt-5 py-2 text-center">React Podcast Player</h2>
    </div>  
    </>
  )
}

export default Header;

//decoded jwt - json web token : to get user info. and store it in useState
