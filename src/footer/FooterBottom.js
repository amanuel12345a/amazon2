import React from "react";
import { footerlist } from "../items";

function FooterBottom() {
  return (
    <div className="w-full bg-footerBottom py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="w-full grid grid-cols-3 md:grip-cols-5 mdl:grid-cols-6 lgl:grid-cols-7 gap-3 place-content-center text-gray-400">
          {footerlist.map((item) => {
            return (
              <div key={item.id}>
                <h3 className="footerBottomTitle">{item.title}</h3>
                <p className="footerBotttomText">{item.des}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default FooterBottom;
