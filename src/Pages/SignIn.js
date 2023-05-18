import React, { useState } from "react";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../store/amazonSlice";
function SignIn() {
  const dispatch = useDispatch();
  const auth = getAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  // firebase Error
  const [userEmailErr, setUserEmailErr] = useState("");
  const [userPassErr, setUserPassErr] = useState("");
  // loading
  const [loading, setLoading] = useState(false);
  const [succesMsg, setSuccesMsg] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };
  const handleSignin = (e) => {
    e.preventDefault();
    if (!password) {
      setErrPassword("Enter Your Password");
    }
    if (!email) {
      setErrEmail("Enter Your email");
    }
    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          setLoading(true);
          const user = userCredential.user;
          console.log(user.uid);
          setLoading(false);
          setSuccesMsg("Login Successfull Welcome Back");
          setTimeout(() => {
            navigate("/");
          }, 2000);
          dispatch(setUserInfo({
              id: user.uid,
              userName: user.displayName,
              email: user.email,
              photo: user.photoURL,
            })
          );
          
        })
        .catch((error) => {
          setLoading(false);
          if (error.code?.includes("auth/wrong-password")) {
            setUserPassErr("Wrong password! try again");
          }
          if (error.code?.includes("auth/invalid-email")) {
            setUserEmailErr("Invalid Email");
          }
        });
      setEmail("");
      setPassword("");
    }
  };
  return (
    <div className="w-full">
      <div className="w-full bg-gray-100 pb-10 pt-5">
        {succesMsg ? (
          <div className="w-full flex justify-centeritems-center py-32">
            <p className="border-[1px] border-green-600 text-green-500 font-titleFont text-lg font-semibold px-6 py-2">
              {succesMsg}
            </p>
          </div>
        ) : (
          <form className="w-[350px] mx-auto flex-col items-center ">
            <Link to="/">
              <img
                className="w-32 mx-auto pb-5"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
                alt="amazonlogo"
              />
            </Link>
            <div className="w-full border border-zinc-200 p-6">
              <h2 className="font-titleFont text-3xl font-medium mb-4">
                Sign In
              </h2>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium">
                    Email or mobile phone number
                  </p>
                  <input
                    onChange={handleEmail}
                    className="w-full lowercase py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
                    type="email"
                    value={email}
                  />
                  {errEmail && (
                    <p className="text-red-600 text-xs font-semibod tracking-wide flex items-center gap-2 -mt-1.5">
                      {errEmail}
                    </p>
                  )}
                  {userEmailErr && (
                    <p className="text-red-600 text-xs font-semibod tracking-wide flex items-center gap-2 -mt-1.5">
                      {userEmailErr}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium">Password</p>
                  <input
                    onChange={handlePassword}
                    className="w-full lowercase py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
                    type="Password"
                    value={password}
                  />
                  {errPassword && (
                    <p className="text-red-600 text-xs font-semibod tracking-wide flex items-center gap-2 -mt-1.5">
                      {errPassword}
                    </p>
                  )}
                  {userPassErr && (
                    <p className="text-red-600 text-xs font-semibod tracking-wide flex items-center gap-2 -mt-1.5">
                      {userPassErr}
                    </p>
                  )}
                </div>
                <button
                  onClick={handleSignin}
                  className="w-full py-1.5 text-sm font-normal rounded-sm bg-gradient-to-t from-[#f7dfa5] to-[#f0c14b] hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput"
                >
                  continue
                </button>
                {loading && (
                  <div className="flex justify-center">
                    <RotatingLines
                      strokeColor="#febd69"
                      strokeWidth="5"
                      animationDuration="0.75"
                      width="50"
                      visible={true}
                    />
                  </div>
                )}
              </div>
              <p className="text-xs text-black leading-4 mt-4 ">
                {" "}
                continuing, you agree to Amazon's{" "}
                <span className="text-blue-600 ">
                  Conditions of Use{" "}
                </span>and{" "}
                <span className="text-blue-600 ">Private Notice</span>
              </p>
              <p className="text-xs text-gray-600 mt-4 cursor-pointer">
                <ArrowRightIcon />{" "}
                <span className="text-blue-600 hover:text-orange-700 hover:underline-offset-1">
                  Need help?
                </span>
              </p>
            </div>
            <div className="w-full text-xs text-gray-600 mt-4 flex items-center">
              <span className="w-1/3 h-[1px] bg-zinc-400 inline-flex "></span>
              <span className="w-1/3 text-center">New to Amazon</span>
              <span className="w-1/3 h-[1px] bg-zinc-400 inline-flex "></span>
            </div>
            <Link className="w-full" to="/signup">
              <button className="w-full py-1.5 mt-4 text-sm font-normal rounded-sm bg-gradient-to-t from-slate-200 to-slate-100 hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput">
                Create your Amazon Account
              </button>
            </Link>
          </form>
        )}
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

export default SignIn;
