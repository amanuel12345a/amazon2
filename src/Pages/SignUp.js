import React, { useState } from "react";
import { logo } from "../assets";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { getAuth, createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import {RotatingLines} from 'react-loader-spinner'
import {motion} from 'framer-motion'
import { Link, useNavigate } from "react-router-dom";
function SignUp() {
  const navigate = useNavigate()
  const auth = getAuth()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  // error
  const [errName, setErrName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [erRePassword, setErrRePassword] = useState("");
  const [firebaseErr,setFirebaseErr] = useState('')
  // loading state
  const [loading,setLoading] = useState(false)
  const [succesMsg,setSuccesMsg] = useState('')
  // function of state
  const handleRePassword = (e) => {
    setRePassword(e.target.value);
  };
  const handleName = (e) => {
    setName(e.target.value);
    setErrName("");
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
    setFirebaseErr('')
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };
  // email function
  const emailValid = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/);
  };

  // submit function
  const handleSignUp = (e) => {
    e.preventDefault();
    if (!name) {
      setErrName("Enter your Name");
    }
    if (!email) {
      setErrEmail("Enter your Email");
    } else {
      if (!emailValid(email)) {
        setErrEmail("Enter a valid email");
      }
    }
    if (!password) {
      setErrPassword("Enter your Password");
    } else {
      if (password.length < 6) {
        setErrPassword("Passwords must be at least 6 characters");
      }
    }
    if (!rePassword) {
      setErrRePassword("Enter your Password");
    } else {
      if (rePassword !== password) {
        setErrRePassword("Password don't match");
      }
    }

    if (
      name &&
      email &&
      emailValid(email) &&
      password &&
      password.length >= 6 &&
      rePassword &&
      rePassword === password
    ) {
      setLoading(true)
      createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    updateProfile(auth.currentUser,{
      displayName:name,
      photoURL:''
    })
    // Signed in 
    const user = userCredential.user;
    setLoading(false)
    setSuccesMsg('Account Created Successfully')
    setTimeout(()=>{
      navigate('/signin')
    },3000)
    // ...
  })
  .catch((error) => {
    setLoading(false)
    const errorCode = error.code;
    const errorMessage = error.message;
    if(error.code.includes('auth/email-already-in-use')){
      setFirebaseErr('Email Already in use, Try another Email')
    }
    // ..
  })
      setEmail("");
      setName("");
      setPassword("");
      setRePassword("");
      setFirebaseErr('')
    }
  };

  return (
    <div className="w-full">
      <div className="w-[370px] mx-auto flex-col items-center pt-5">
        <form>
          <Link to='/'>
          <img className="w-32 mx-auto mt-3 pb-5" src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' alt="amazon" />
          </Link>
          <div className="w-full border border-zinc-200 p-6">
            <h2 className="font-titleFont text-3xl font-medium mb-4">
              Create Account
            </h2>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Your name</p>
                <input
                  onChange={handleName}
                  value={name}
                  className="w-full  py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
                  type="text"
                />
                {errName && (
                  <p className="text-red-600 text-xs font-semibod tracking-wide flex items-center gap-2 -mt-1.5">
                    {errName}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">
                  Email or mobile phone number
                </p>
                <input
                  onChange={handleEmail}
                  value={email}
                  className="w-full  py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
                  type="email"
                />
                {errEmail && (
                  <p className="text-red-600 text-xs font-semibod tracking-wide flex items-center gap-2 -mt-1.5">
                    {errEmail}
                  </p>
                )}
                {firebaseErr && (
                  <p className="text-red-600 text-xs font-semibod tracking-wide flex items-center gap-2 -mt-1.5">
                    {firebaseErr}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Password</p>
                <input
                  onChange={handlePassword}
                  value={password}
                  className="w-full  py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
                  type="password"
                />
                {errPassword && (
                  <p className="text-red-600 text-xs font-semibod tracking-wide flex items-center gap-2 -mt-1.5">
                    {errPassword}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Re-enter Password</p>
                <input
                  onChange={handleRePassword}
                  value={rePassword}
                  className="w-full py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
                  type="password"
                />
                {erRePassword && (
                  <p className="text-red-600 text-xs font-semibod tracking-wide flex items-center gap-2 -mt-1.5">
                    {erRePassword}
                  </p>
                )}
                <p className="text-xs text-gray-600">
                  Password must be at least at least 6 characters.{" "}
                </p>
              </div>
              <button
                onClick={handleSignUp}
                className="w-full py-1.5 text-sm font-normal rounded-sm bg-gradient-to-t from-[#f7dfa5] to-[#f0c14b] hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput"
              >
                continue
              </button>
              {
                loading && <div className="flex justify-center"> 
                  <RotatingLines
  strokeColor="#febd69"
  strokeWidth="5"
  animationDuration="0.75"
  width="50"
  visible={true}
/>
                </div>
              }
              {
                succesMsg && 
                  <div> 
                    <motion.p
                    intial={{y:10,opacity:0}}
                    animate={{y:0,opacity:1}}
                    trasition={{duration:0.5}}
                    className='text-base font-titleFont font-semibold text-green-500 border-[1px] border-green-500 px-2 text-center'
                    >{succesMsg}</motion.p>
                  </div>
                
              }
            </div>
            <p className="text-xs text-black leading-4 mt-4 ">
              {" "}
              continuing, you agree to Amazon's{" "}
              <span className="text-blue-600 ">Conditions of Use </span>and{" "}
              <span className="text-blue-600 ">Private Notice</span>
            </p>
            <div>
              <p className="text-xs text-black">
                Already have an account?
                <Link to="/signin">
                  <span className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">
                    Sign In{" "}
                    <span>
                      <ArrowRightIcon />
                    </span>
                  </span>
                </Link>
              </p>
              <p className="text-xs text-black -mt-2">
                buying for work?{" "}
                <span className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">
                  Create a free business Acount
                </span>
              </p>
            </div>
          </div>
        </form>
      </div>
      <div className="w-full bg-gradient-t from-white via-white to-zinc-200 flex flex-col gap-4 justify-center items-center py-10">
        <div className="flex items-center gap-6 ">
          <p className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">
            condition of Use
          </p>
          <p className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">
            Privaacy Notice
          </p>
          <p className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">
            condition of Use
          </p>
        </div>
        <p className="text-xs text-gray-600">
          {" "}
          1996-2023, ReactBd.com, Inc. or its affiliates
        </p>
      </div>
    </div>
  );
}

export default SignUp;
