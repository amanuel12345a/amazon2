import React, { useEffect, useRef, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SideNavContent from "./SideNavContent";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
function HeaderBottom() {
  const [sidebar, SetSidebar] = useState(false);
  const userInfo = useSelector((state) => state.amazon.userInfo);
  const ref = useRef();
  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (e.target.contains(ref.current)) {
        // SetSidebar(false)
      }
    });
  }, [ref, sidebar]);
  return (
    <div className="w-full px-4 h-[36px] bg-amazon_light text-white flex items-center">
      <ul className="flex items-center gap-2 text-sm tracking-wide">
        <li
          onClick={() => SetSidebar(true)}
          className="headerHover flex items-center gap-1"
        >
          {" "}
          <MenuIcon />
          All
        </li>
        <li className="headerHover hidden md:line-flex">Today's deals</li>
        <li className="headerHover hidden md:line-flex">Customer Service</li>
        <li className="headerHover hidden md:line-flex">Gift Cards</li>
        <li className="headerHover hidden md:line-flex">Registry</li>
        <li className="headerHover hidden md:line-flex">Sell</li>
      </ul>
      {sidebar && (
        <div className="w-full h-screen text-black fixed top-0 left-0 bg-amazon_blue bg-opacity-50">
          <div className="w-full h-full relative">
            <motion.div
              ref={ref}
              initial={{ x: 0, opacity: 1 }}
              animation={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-[80%] mdl:w-[350px] h-full bg-white border-black"
            >
              <div className="w-full bg-amazon_lighttext-white py-2 px-6 flex items-center gap-4">
                {
                  userInfo?.photo ? <img className="w-10 h-10 rounded-full" src={userInfo.photo}
                  alt='user profile' /> : <AccountCircleIcon />
                }
                {
            userInfo?.userName ? <h3 className="font-titleFont font-bold text-lg tracking-wide">
            {userInfo?.userName}
          </h3> :<h3 className="font-titleFont font-bold text-lg tracking-wide">
            Hello, sign in
          </h3>
          }
              </div>
              <SideNavContent
                title="Digital Content & Devices"
                one="Amazon Music"
                two="Kindle E-readers & books"
                three="Amazon Appstore"
              />
              <SideNavContent
                title="Shop By Department"
                one="Electronics"
                two="Computers"
                three="Smart Home"
              />
              <SideNavContent
                title="Programs & Features"
                one="Gift Cards"
                two="Amazon live"
                three="International Shopping"
              />
              <SideNavContent
                title="Help & Setting"
                one="Your Account"
                two="Customer Service"
                three="Contact us"
              />
              <span
                onClick={() => SetSidebar(false)}
                className="cursor-pointer absolute top-0 
                left-[82%] md:left-[360px] w-10 h-10 text-black flex items-center justify-center border bg-gray-200 hover:bg-red-500 hover:text-white duration-100"
              >
                <CloseIcon />
              </span>
            </motion.div>
            <span
              onClick={() => SetSidebar(false)}
              className="cursor-pointer absolute top-0 left-[360px] w-10 h-10 text-black flex items-center justify-center border bg-gray-200 hover:bg-red-500 hover:text-white duration-100"
            >
              <CloseIcon />
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default HeaderBottom;
