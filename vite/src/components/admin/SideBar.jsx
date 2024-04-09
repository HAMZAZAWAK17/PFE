import React, { useState, useEffect } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { AiOutlineDashboard } from "react-icons/ai";
import { RiSettings4Line } from "react-icons/ri";
import { GrUserWorker } from "react-icons/gr";
import { HiUsers } from "react-icons/hi2";
import { MdOutlinePets } from "react-icons/md";
import { Link, useNavigate, useLocation } from "react-router-dom"; 
import { ImExit } from "react-icons/im";

const SideBar = () => {
  const [open, setOpen] = useState(true);
  const [animalCount, setAnimalCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [staffCount, setStaffCount] = useState(0);
  const [activeLink, setActiveLink] = useState("dashboard");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      setAnimalCount(Math.floor(Math.random() * 100));
      setUserCount(Math.floor(Math.random() * 1000));
      setStaffCount(Math.floor(Math.random() * 50));
    };

    fetchData();
  }, []);

  const handleExitClick = () => {
    navigate("/home");
  };

  const menus = [
    { name: "dashboard", link: "/sidebar", icon: AiOutlineDashboard },
    { name: "users", link: "/admin/users-dashboard", icon: HiUsers },
    { name: "pets", link: "/admin-dashboard", icon: MdOutlinePets },
    { name: "staff", link: "/", icon: GrUserWorker },
    { name: "exit", link: "/", icon: ImExit },
  ];

  return (
    <section className="flex gap-6">
      <div
        className={`bg-[#183153] min-h-screen ${
          open ? "w-72" : "w-16"
        } duration-500 text-amber-400 px-4`}
      >
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus?.map((menu, i) => (
            <Link
              to={menu?.link}
              key={i}
              className={` ${
                menu?.margin && "mt-5"
              } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
              onClick={() => setActiveLink(menu?.name)}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 text-amber-400 font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
      <div className="m-3 text-xl text-gray-900 font-semibold">
        {activeLink === "dashboard" ? (
          <div className="flex gap-4">
            <div className="flex justify-center items-center gap-4">
              <div className="w-40 h-20 bg-red-500 flex items-center justify-center rounded-md text-white">
                <span>{animalCount} Nombre d'animaux</span>
              </div>
              <div className="w-40 h-20 bg-green-500 flex items-center justify-center rounded-md text-white">
                <span>{userCount} Nombre d'utilisateurs</span>
              </div>
              <div className="w-40 h-20 bg-blue-500 flex items-center justify-center rounded-md text-white">
                <span>{staffCount} Nombre de membres du personnel</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div>CRUD DE : "{activeLink}"</div>
            <h1>crud</h1>
          </div>
        )}
      </div>
    </section>
  );
};

export default SideBar;
