import { Link } from "react-router-dom";
import { useMenu } from "../context/context";
import "./Navbar.css";
import { IoMdMenu } from "react-icons/io";
import Register from "../Register";

export const navItems = [
  {
    title: "Accueil",
    href: "/",
  },
  {
    title: "Adopter maintenant",
    href: "/pets",
  },
  {
    title: "Contact",
    href: "/contact",
  },
  {
    title: "A Propos",
    href: "/about",
  },
];
const Navbar = () => {
  const { openMenu, closeMenu, isMenuOpen } = useMenu();

  return (
    <header className="header font-poppins bg-slate-800 fixed top-0 left-0 w-full px-100 flex justify-between items-center z-10">
      <Link
        to="/"
        className="logo mr-6 text-23 font-extra-bold text-amber-600 w-17 select-none outline-none"
      >
        Furry Buddies
      </Link>
      <nav className="navbar ml-10 items-center sm:flex hidden lg:flex-1">
        {navItems.map((item, index) => (
          <Link
            key={index}
            to={item.href}
            className="mr-10 outline-none text-amber-400 font-500 text-14 select-none hover:underline underline-offset-4"
          >
            {item.title}
          </Link>
        ))}
      </nav>
      <div className="navbar-right mr-0 sm:flex hidden items-center justify-between">
        <Link to="/register">
          <button className="select-none bg-amber-400 hover:bg-white hover:text-black px-4 pt-2.5 pb-2.5 rounded-3xl mr-4 text-black font-500 text-14 py-7 px-15 rounded-5">
            Register
          </button>
        </Link>
        <Link to="/login">
          <button className="select-none bg-transparent border-0 text-white hover:text-amber-500 font-500 text-14 py-7 px-15 rounded-5">
            Log in
          </button>
        </Link>
      </div>
      <div className="navbar-right mr-0 sm:hidden flex items-center justify-between">
        {isMenuOpen ? (
          ""
        ) : (
          <IoMdMenu
            onClick={openMenu}
            className="text-3x1 text-amber-400 cursor-pointer"
          />
        )}
      </div>
    </header>
  );
};

export default Navbar;
