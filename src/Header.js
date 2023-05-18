import React, { useState } from "react";
import { logo } from "./assets/index";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchIcon from "@mui/icons-material/Search";
import { allItems } from "./items";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import HeaderBottom from "./HeaderBottom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import { getAuth, signOut } from "firebase/auth";
import { userSignOut } from "./store/amazonSlice";
function Header() {
  const [showall, setShowAll] = useState(false);
  const products = useSelector((state) => state.amazon.products);
  const dispatch = useDispatch()
  const userInfo = useSelector((state) => state.amazon.userInfo);
  const auth = getAuth();
  const handleLogOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      dispatch(userSignOut())
    }).catch((error) => {
      // An error happened.
    })
  }
  return (
    <div className="w-full sticky top-0 z-50">
      <div className="w-full bg-amazon_blue text-white px-4 py-3 flex gap-4">
        <Link to='/'>
        <div className="headerHover">
          <img className="w-24 mt-2" src={logo} alt="logo" />
        </div>
        </Link>
        <div className="headerHover hidden mdl:inline-flex">
          <LocationOnIcon />
          <p className="text-sm text-lightText font-light flex flex-col">
            Deliver to{" "}
            <span className="text-sm font-semibold -mt-1 text-whiteText">
              USA
            </span>
          </p>
        </div>
        <div className="h-10 rounded-md hidden lgl:flex flex-grow relative ">
          <span
            onClick={() => setShowAll(!showall)}
            className="w-14 h-full bg-gray-200 hover:bg-gray-300 border-2 cursor-pointer duration-300 text-sm text-amazon_blue font-titleFont flex items-center justify-center rounded-tl-md rounded-bl-md"
          >
            All{" "}
            <span>
              <ArrowDropDownIcon />
            </span>
          </span>
          {showall && (
            <div>
              <ul className="absolute 2-56 h-80 top-10 left-0 overflow-y-scroll overflow-x-hidden bg-white border-[1px] border-amazon_blue text-black p-2 flex-col gap-1 z-50 ">
                {allItems.map((item) => {
                  return (
                    <li
                      key={item.id}
                      className="text-sm tracking-wide font-titleFont border-b-[1px] border-b-transparent hover:border-b-amazon_blue cursor-pointer duration-200"
                    >
                      {item.name}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          <input
            type="text"
            className="h-full text-base text-amazon_blue flex-grow outline_none border-none px-2"
          />
          <span className="w-12 h-full flex items-center justify-center bg-amazon_yellow hover:bg-[#f3a847] duration-300 text-amazon_blue cursor-pointer rounded-tr-md rounded-br-md">
            <SearchIcon />
          </span>
        </div>
        <Link to='/signin'>
        <div className="flex flex-col items-start justify-center headerHover">
          {
            userInfo?.userName ? <p className="text-sm mdl:text-xs text-white mdl:text-lightText font-light ">
            {userInfo.userName}
            {console.log(userInfo.userName)}
          </p> :<p className="text-sm mdl:text-xs text-white mdl:text-lightText font-light ">
            Hello, sign in
          </p>
          }
          
          <p className="text-sm font-semibold -mt-1 text-whiteText hidden mdl:inline-flex">
            accounts & lists{""}{" "}
            <span>
              <ArrowDropDownIcon />
            </span>
          </p>
        </div>
        </Link>
        <div className="hidden lgl:flex flex-col items-start justify-center headerHover">
          <span className="text-xs text-lightText font-light">Returns</span>
          <span className="text-sm font-semibold -mt-1 text-whiteText">
            & Orders
          </span>
        </div>
       <Link to='/cart'>
       <div className="flex items-start justify-center headerHover relative">
          <AddShoppingCartIcon />
          <p className="text-xs font-semiBold mt-3 text-whiteText">
            Cart{" "}
            <span className="absolute text-xs top-0 left-6 font-semibold p-1 h-4 bg-[#f3a847] text-amazon_blue rounded-full flex justify-center items-center">
              {products.length}
            </span>
          </p>
        </div>
       </Link>
       {
        userInfo?.userName && <div onClick={handleLogOut} className="flex flex-col justify-center items-center headerHover realtive">

        <LogoutIcon />
        <p className="hidden mdl:inline-flex text-xs font-semibold text-whiteText">
          Log Out
        </p>
       </div>
       }
      
      </div>
      <HeaderBottom />
    </div>
  );
}

export default Header;
