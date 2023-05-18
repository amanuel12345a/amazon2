import React from "react";
import FooterMiddleList from "./FooterMiddleList";
import { middleList } from "../items";
import { bdFlag, logo } from "../assets";

function FooterMiddle() {
  return (
    <div className="w-full bg-amazon_blue text-white">
      <div className="w-full border-b-[1px] border-gray-500 p-10">
        <div className="max-w-5xl mx-auto text-gray-300">
          <div className="w-full grid grid-cols-1 ms:grid-cols-2 xl:grid-cols-4 md:place-items-center md:items-start">
            {middleList.map((item) => (
              <FooterMiddleList
                key={item.id}
                title={item.title}
                listItem={item.ListItem}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="w-full flex gap-6 items-center justify-center py-8">
        <div>
          <img className="w-20 pt-3" src={logo} alt="amazon" />
        </div>
        <div className="flex gap-2">
          <p className="flex gap-1 items-center justify-center border border-gray-500 hover:border-amazon_yellow cursor-pointer duration-200 px-2 py-1">
            English
          </p>
        </div>
        <div className="flex gap-1 items-center justif-center border border-gray-500 hover:border-amazon_yellow cursor-pointer duration-200 px-2 py-1">
          <img className="w-6" src={bdFlag} alt="country" />
          <p>USA</p>
        </div>
      </div>
    </div>
  );
}

export default FooterMiddle;
