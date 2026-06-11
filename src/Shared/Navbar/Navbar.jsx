import { GiRolledCloth } from "react-icons/gi";
import { Link, NavLink } from "react-router";
import useAuth from "../../Hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();

  //  Logout
  const handleLogOut = () => {
    logOut()
      .then(() => console.log("logout success"))
      .catch((err) => console.log(err));
  };

  //  Theme Toggle
  const handleTheme = (checked) => {
    const html = document.querySelector("html");
    const theme = checked ? "dark" : "light";

    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  };

  // Nav Links
  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-[#192586] font-semibold"
              : "hover:text-[#27379b] transition"
          }
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/allProducts"
          className={({ isActive }) =>
            isActive
              ? "text-[#192586] font-semibold"
              : "hover:text-[#27379b] transition"
          }
        >
          Products
        </NavLink>
      </li>

      {/* Dashboard only if logged in */}
      {user && (
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "text-[#192586] font-semibold"
                : "hover:text-[#27379b] transition"
            }
          >
            Dashboard
          </NavLink>
        </li>
      )}
      {user && (
        <li>
          <NavLink
            to="/blog"
            className={({ isActive }) =>
              isActive
                ? "text-[#192586] font-semibold"
                : "hover:text-[#27379b] transition"
            }
          >
            Blog
          </NavLink>
        </li>
      )}

      <li>
        <NavLink
          to="/aboutUS"
          className={({ isActive }) =>
            isActive
              ? "text-[#192586] font-semibold"
              : "hover:text-[#27379b] transition"
          }
        >
          About
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/contactUS"
          className={({ isActive }) =>
            isActive
              ? "text-[#192586] font-semibold"
              : "hover:text-[#27379b] transition"
          }
        >
          Contact
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md px-3 sm:px-5 sticky top-0 z-50">
      {/* LEFT */}
      <div className="navbar-start">
        {/* Mobile Menu */}
        <div className="dropdown lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[100] p-3 shadow bg-base-100 rounded-box w-52 space-y-1"
          >
            {links}
          </ul>
        </div>

        {/* Logo */}
   
<Link
  to="/"
  className="group flex items-center gap-2 sm:gap-3 ml-1 sm:ml-2"
>
  <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110">
    <GiRolledCloth className="text-3xl sm:text-4xl text-sky-700 drop-shadow-sm transition-all duration-300 group-hover:text-blue-700 group-hover:drop-shadow-md" />
  </div>

  <div className="leading-tight">
    <span className="block text-xl sm:text-2xl font-bold text-sky-700 font-serif tracking-tight transition-colors duration-300 group-hover:text-blue-700">
      Texora
    </span>

    <span className="hidden sm:block text-[10px] font-medium uppercase tracking-[0.18em] text-slate-400">
      Garments
    </span>
  </div>
</Link>

      </div>

      {/* CENTER MENU */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2 text-sm xl:text-base">
          {links}
        </ul>
      </div>

      {/* RIGHT */}
      <div className="navbar-end flex items-center gap-2 sm:gap-3">
        {/* Theme Toggle */}
        <div className="flex items-center gap-1 sm:gap-2 bg-base-200 px-2 py-1 rounded-full">
          <input
            type="checkbox"
            onChange={(e) => handleTheme(e.target.checked)}
            defaultChecked={localStorage.getItem("theme") === "dark"}
            className="toggle toggle-xs sm:toggle-sm toggle-primary"
          />
        </div>

        {/* USER CONDITION */}
        {user ? (
          <div className="dropdown dropdown-end z-[100]">
            {/* Profile Image Trigger */}
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar online"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-[#192586]">
                <img
                  src={
                    user?.photoURL ||
                    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  }
                  alt="profile"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Dropdown Content */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 border border-base-200 space-y-1"
            >
              {/* User Name Display */}
              <li className="px-3 py-2 border-b border-base-200 font-medium text-sm text-base-content/80 break-words">
                {user?.displayName || "Texora User"}
              </li>
              
              <li>
                <Link to="/dashboard" className="hover:bg-base-200 py-2">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/allProducts" className="hover:bg-base-200 py-2">
                  Products
                </Link>
              </li>
              <li>
                <Link  className="hover:bg-base-200 py-2">
                  Settings
                </Link>
              </li>
              <li className="mt-2 pt-1 border-t border-base-200">
                <button
                  onClick={handleLogOut}
                  className="btn btn-sm bg-[#192586] hover:bg-[#27379b] text-white border-none w-full text-center"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Login */}
            <Link
              to="/login"
              className="btn btn-xs sm:btn-sm btn-ghost text-[#5c6dc9]"
            >
              Login
            </Link>

            {/* Register */}
            <Link
              to="/register"
              className="btn btn-xs sm:btn-sm bg-[#3141b8] hover:bg-[#27379b] text-white border-none"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;