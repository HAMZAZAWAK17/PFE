import React from "react";
import { useMenu } from "../context/context";
import { IoMdClose } from "react-icons/io";
import { navItems } from "./Navbar";

export default function Menu() {
  const { isMenuOpen, closeMenu } = useMenu();
  return (
    <>
      {isMenuOpen ? (
        <div className="fixed inset-0 z-50 flex h-full items-center sm:hidden">
          <section
            onClick={closeMenu}
            className="size-full flex items-center justify-center py-3"
          >
            <div className="bg-slate-800 opacity-65 absolute inset-0"></div>
            <div className="flex flex-col items-center bg-white size-52 opacity-100 rounded-lg p-4 z-50">
              <IoMdClose
                onClick={closeMenu}
                size={25}
                className="text-3x1 text-amber-400 cursor-pointer ml-auto z-50 "
              />
              {navItems.map((item, index) => {
                return (
                  <a key={index} href={item.href} className="mb-4">
                    {item.title}
                  </a>
                );
              })}
            </div>
          </section>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
