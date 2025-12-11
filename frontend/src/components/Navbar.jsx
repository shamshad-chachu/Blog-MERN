import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../theme/ThemeToggle";
import { StoreContext } from "../Context/StoreContext";
import { CircleUser, TextAlignJustify } from "lucide-react";

const Navbar = () => {
  const [showMobileMenue, setShowMobileMenue] = useState(false);
  const [showMenue, setShowMenue] = useState(false);
  const { setShowLoginForm, isLogin, Logout} = useContext(StoreContext);

  const handleAuthClick = () => {
    if (isLogin) {
      Logout();
    } else {
      setShowLoginForm(true);
    }
  };

  const navItemClasses =
    "hover:text-blue-500 dark:hover:text-blue-400 transition duration-150 cursor-pointer";

  return (
    <>
      <div className="bg-neutral-100 dark:bg-neutral-900 w-full sticky top-0 shadow-lg flex justify-between items-center px-5 md:px-10 py-5 z-40">
        <Link
          to="/"
          className="text-blue-900 dark:text-blue-700 font-bold text-2xl"
        >
          MyBlog
        </Link>
        <div className="hidden md:block">
          <ul className="flex gap-10 text-md text-neutral-900 dark:text-neutral-100 tracking-tight items-center">
            <Link to="/" className={navItemClasses}>
              Home
            </Link>
            <Link to="/Blogs" className={navItemClasses}>
              Blog
            </Link>
            <ThemeToggle />
            <div
              className={
                navItemClasses +
                " font-semibold text-blue-700 dark:text-blue-400"
              }
            >
              <p onClick={()=>setShowMenue(!showMenue)}><CircleUser size={28} /></p>
              {showMenue && (
                <div className="bg-neutral-100 dark:bg-neutral-900 right-0 top-18 w-60 mb-5 p-5 text-lg block shadow-lg absolute z-30">
                  {!isLogin?(
                    <>
                    <p className="shadow-sm bg-neutral-100 dark:bg-neutral-800 mb-2 ps-3 rounded-sm" onClick={handleAuthClick}>Login</p>
                    <p className="shadow-sm bg-neutral-100 dark:bg-neutral-800 ps-3 rounded-sm" onClick={handleAuthClick}>Register</p>
                    </>
                    )
                    :(
                      <>
                      <div className="flex flex-col gap-3">
                      <Link to='/user/Blogs' className={navItemClasses}>User Blogs</Link>
                      <Link to='/user/Blogs/Update' className={navItemClasses}>Edit/Del Blogs</Link>
                      </div>
                      <p className="shadow-sm bg-neutral-100 dark:bg-neutral-800 mb-2 ps-3 rounded-sm mt-3" onClick={handleAuthClick}>Logout</p>
                      </>
                    )}
                </div>
              )}
            </div>
          </ul>
        </div>
        {/* Mobile Menu Toggle */}
        <div
          className="block md:hidden text-2xl cursor-pointer"
          onClick={() => {
            setShowMobileMenue(!showMobileMenue);
          }}
        >
          <TextAlignJustify className="dark:text-neutral-100" />
        </div>
      </div>
      {/* Mobile Menu */}
      {showMobileMenue && (
        <div className="bg-neutral-100 dark:bg-neutral-900 right-0 top-15 w-full mb-5 p-5 text-lg block md:hidden shadow-lg absolute z-30">
          <ul className="flex flex-col gap-5 text-neutral-900 dark:text-neutral-100 tracking-tight w-full">
            <Link to="/" className={navItemClasses}>
              Home
            </Link>
            <Link to="/Blogs" className={navItemClasses}>
              Blog
            </Link>
            <ThemeToggle />
            {isLogin && (
              <>
                <Link to='/user/Blogs' className={navItemClasses}>User Blogs</Link>
                <Link to='/user/Blogs/Update' className={navItemClasses}>Edit/Del Blogs</Link>
              </>
            )}
            <div
              onClick={handleAuthClick}
              className={
                navItemClasses +
                " font-semibold text-blue-700 dark:text-blue-400"
              }
            >
              <p>{isLogin ? "Logout" : "Login"}</p>
            </div>
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
