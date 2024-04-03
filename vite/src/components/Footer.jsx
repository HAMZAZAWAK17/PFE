import React from "react";
import { SiAmazonaws } from "react-icons/si";
import { FaApple } from "react-icons/fa";
import { SiTesla } from "react-icons/si";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-slate-800 h-60">
      <div>
        <div className="flex">
          <div className="pl-14 py-20 w-60">
            <a
              href="#"
              className="logo text-23 font-extra-bold text-amber-600 w-17 select-none"
            >
              Furry Buddies
            </a>
          </div>
          <div className="mt-16 ml-52">
            <SiAmazonaws color="orange" size={75} />
          </div>
          <div className="mt-14 ml-12">
            <FaApple color="orange" size={75} />
          </div>
          <div className="mt-16 ml-12">
            <SiTesla color="orange" size={75} />
          </div>
          <div className="flex ml-52">
            <a href="" className="mt-20">
              <FaFacebook color="white" size={23} />
            </a>
            <a href="" className="mt-20 ml-2">
              <FaInstagram color="white" size={24} />
            </a>
            <a href="" className="mt-20 ml-2">
              <FaXTwitter color="white" size={24} />
            </a>
            <a href="" className="mt-20 ml-2">
              <FaLinkedin color="white" size={24} />
            </a>
            <a href="" className="mt-20 ml-2">
              <FaTiktok color="white" size={24} />
            </a>
          </div>
        </div>
        <hr className="h-1 bg-white rounded-3xl mx-16" />
        <div className="flex justify-center">
          <div className="flex">
            <p className="text-gray-50 text-xs mt-3">
              @2024 Bouzaidi & Ezzouek All rights reserved
            </p>
            <a href="" className="ml-12 underline text-sm text-gray-50 mt-2">
              Conditions d'utilisation
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
