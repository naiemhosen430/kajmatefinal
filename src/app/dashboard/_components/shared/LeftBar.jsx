"use client";
import Link from "next/link";
import React from "react";
import { FaTachometerAlt, FaShoppingCart, FaSignOutAlt } from "react-icons/fa"; 
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

const LeftBar = () => {
  const router = useRouter();

  const handleLogOut = () => {
    deleteCookie("accesstoken");
    router.push("/login", { scroll: true });
  }
  
  const manu_items = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <FaTachometerAlt />,
    },
    {
      name: "Order",
      href: "/order",
      icon: <FaShoppingCart />,
    },
    {
      name: "Log out",
      href: "", // No href, handled by onClick
      icon: <FaSignOutAlt />,
      onClick: handleLogOut, 
    },
  ];



  return (
    <div>
      {/* Sidebar for large screens */}
      <div className="hidden lg:block bg-slate-800 lg:h-screen p-2">
        <ul>
          {manu_items?.map((s_menu, menu_index) => (
            <li className=" w-full" key={menu_index}>
              {/* Check if the item has an onClick handler for the logout */}
              {s_menu.onClick ? (
                <button
                  className="p-2 px-4 text-slate-400 block w-full font-serif font-[600] hover:bg-slate-700 border-b-[1px] border-gray-500"
                  onClick={s_menu.onClick}
                >
                  {/* {s_menu.icon} */}
                  {s_menu.name}
                </button>
              ) : (
                <Link
                  className="p-2 px-4 text-slate-400 block w-full font-serif font-[600] hover:bg-slate-700 border-b-[1px] border-gray-500"
                  href={s_menu.href}
                >
                  {/* {s_menu.icon} */}
                  {s_menu.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom navigation for small screens */}
      <div className="lg:hidden bg-slate-800 p-2 fixed bottom-0 left-0 right-0">
        <ul className="flex justify-around">
          {manu_items?.map((s_menu, menu_index) => (
            <li key={menu_index}>
              {/* Handle the logout action in small screens similarly */}
              {s_menu.onClick ? (
                <button
                  className="flex flex-col items-center p-2 text-slate-400 hover:bg-slate-700"
                  onClick={s_menu.onClick}
                >
                  <div className="text-2xl">{s_menu.icon}</div>
                  <span className="text-xs">{s_menu.name}</span>
                </button>
              ) : (
                <Link
                  className="flex flex-col items-center p-2 text-slate-400 hover:bg-slate-700"
                  href={s_menu.href}
                >
                  <div className="text-2xl">{s_menu.icon}</div>
                  <span className="text-xs">{s_menu.name}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LeftBar;
