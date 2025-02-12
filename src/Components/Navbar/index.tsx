"use client";
import Link from "next/link";
import ThemeToggler from "./ThemeToggler";
import { DownloadIcon, Menu } from "lucide-react";

const Header = () => {
  return (
    <>
      <div className="navbar bg-base-100 px-10">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <Menu size={24} />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {[
                { name: "About", path: "/about" },
                { name: "Contact", path: "/contact" },
                { name: "Services", path: "/services" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className="text-base-content text-base hover:text-primary"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Link
            href="/"
            className="w-full text-2xl font-bold flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-base-200 transition-colors duration-300"
          >
            <DownloadIcon size={48} />
            <div className="flex flex-col items-start gap-1 w-60">
              <div className="flex items-baseline gap-[2px]">
                <span className="text-primary font-extrabold text-xl">
                  Intelli
                </span>
                <span className="text-accent font-semibold text-xl">Mark</span>
              </div>
              <hr className="w-full border border-base-content" />
              <span className="text-sm text-base-content/70 italic">
                Why remember when you can save?
              </span>
            </div>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {[
              { name: "About", path: "/about" },
              { name: "Contact", path: "/contact" },
              { name: "Services", path: "/services" },
            ].map((item) => (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className="text-base-content text-base hover:text-primary hidden lg:block"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="navbar-end space-x-3">
          {[
            { name: "Sign In", link: "/signin", color: "btn-secondary" },
            { name: "Sign Up", link: "/signup", color: "btn-accent" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.link}
              className={`btn ${item.color} hidden lg:flex items-center justify-center`}
            >
              {item.name}
            </Link>
          ))}
          <ThemeToggler />
        </div>
      </div>
    </>
  );
};

export default Header;
