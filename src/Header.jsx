import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function Header({ cartCounter }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClasses = ({ isActive }) =>
    `cursor-pointer py-[27px] transition-all duration-300 
    ${isActive ? "text-purple-700" : "text-white hover:text-purple-500"}`;

  return (
    <>
      <div className="header fixed top-0 w-full h-20 z-50 flex justify-between items-center px-4 md:px-20 py-4 bg-black/70 backdrop-blur-md">
        {/* Logo */}
        <h2 className="uppercase text-3xl font-extrabold text-purple-500">
          Sound
        </h2>
        <div></div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-10 font-semibold">
          <NavLink to="/" end className={linkClasses}>
            Home
          </NavLink>

          <NavLink to="/returns" className={linkClasses}>
            Order Details
          </NavLink>

          <NavLink to="/cart" className={linkClasses}>
            <i className="fas fa-shopping-cart text-xl"></i>
            <span className="mx-2">Cart</span>
            <span className="inline-block w-6 text-center">{cartCounter}</span>
          </NavLink>

          <NavLink to="/profile" className={linkClasses}>
            <i className="fas fa-user mr-2"></i>Zeinab Hassan
          </NavLink>
        </nav>

        {/* Mobile Menu Icon */}
        <div className="flex lg:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="cursor-pointer text-3xl text-purple-400 focus:outline-none"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="lg:hidden animate-fade-down text-lg backdrop-blur text-white bg-purple-600/10  fixed top-[80px] left-1/2 -translate-x-1/2 w-[90%] text-center rounded-xl shadow-md py-4 z-40">
          <nav className="flex flex-col gap-3">
            <NavLink to="/" end className={linkClasses}>
              Home
            </NavLink>

            <NavLink to="/returns" className={linkClasses}>
              Order Details
            </NavLink>

            <NavLink to="/cart" className={linkClasses}>
              <i className="fas fa-shopping-cart text-xl"></i>
              <span className="mx-2">Cart</span>
              <span className="inline-block w-6 text-center">{cartCounter}</span>
            </NavLink>

            <NavLink to="/profile" className={linkClasses}>
              <i className="fas fa-user mr-2"></i>Zeinab Hassan
            </NavLink>
          </nav>
        </div>
      )}
    </>
  );
}

export default Header;
