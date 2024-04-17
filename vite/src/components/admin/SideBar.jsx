import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { HiUsers } from "react-icons/hi2";
import { MdOutlinePets } from "react-icons/md";
import { GrUserWorker } from "react-icons/gr";
import { ImExit } from "react-icons/im";

const SideBar = () => {
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const location = useLocation();
  const [animalCount, setAnimalCount] = useState(0);
  const [employeeCount, setEmployeeCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  // useEffect(() => {
  //   // Fetch data for statistics
  //   const fetchStatistics = async () => {
  //     try {
  //       const animalResponse = await fetch("http://localhost:8000/api/petlist");
  //       const animalData = await animalResponse.json();
  //       setAnimalCount(animalData.length);

  //       const employeeResponse = await fetch("http://localhost:8000/api/team-list");
  //       const employeeData = await employeeResponse.json();
  //       setEmployeeCount(employeeData.length);

  //       const userResponse = await fetch("http://localhost:8000/api/users-list");
  //       const userData = await userResponse.json();
  //       setUserCount(userData.length);
  //     } catch (error) {
  //       console.error("Error fetching statistics:", error);
  //     }
  //   };

  //   fetchStatistics();
  // }, []);

  const menus = [
    { name: "dashboard", link: "/sidebar", icon: AiOutlineDashboard },
    { name: "users", link: "/admin/users-dashboard", icon: HiUsers },
    { name: "pets", link: "/admin-dashboard", icon: MdOutlinePets },
    { name: "staff", link: "/admin/team-dashboard", icon: GrUserWorker },
    { name: "exit", link: "/", icon: ImExit },
  ];

  const handleMenuClick = () => {
    setHoveredMenu(null);
  };

  return (
    <>
      <nav className="flex justify-between bg-[#183153] text-amber-400 p-5">
        {menus.map((menu, i) => (
          <Link
            key={i}
            to={menu.link}
            className={`flex items-center gap-2 p-2 hover:text-white hover:bg-gray-800 rounded-md`}
            onMouseEnter={() => setHoveredMenu(menu.name)}
            onMouseLeave={() => setHoveredMenu(null)}
            onClick={handleMenuClick}
          >
            {React.createElement(menu.icon, { size: "20" })}
            {hoveredMenu === menu.name && (
              <span className="ml-2">{menu.name}</span>
            )}
          </Link>
        ))}
      </nav>
      {location.pathname === "/sidebar" && (
        <div className="flex justify-around mt-4">
          <div className="bg-red-500 text-white p-4 rounded-md">
            <h2>Nombre d'animaux:</h2>
            <p>{animalCount}</p>
          </div>
          <div className="bg-green-500 text-white p-4 rounded-md">
            <h2>Nombre d'employés:</h2>
            <p>{employeeCount}</p>
          </div>
          <div className="bg-blue-500 text-white p-4 rounded-md">
            <h2>Nombre d'utilisateurs:</h2>
            <p>{userCount}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default SideBar;
