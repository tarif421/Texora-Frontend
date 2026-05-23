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

      {/*  Dashboard only if logged in */}
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
      {/*  LEFT */}
      <div className="navbar-start">
        {/*  Mobile Menu */}
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

        {/*  Logo */}
        <Link to="/" className="flex items-center gap-2 ml-1 sm:ml-2">
          <GiRolledCloth className="text-2xl sm:text-3xl text-[#192586]" />

          <span className="text-xl sm:text-2xl font-bold text-[#192586] font-serif">
            Texora
          </span>
        </Link>
      </div>

      {/*  CENTER MENU */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2 text-sm xl:text-base">
          {links}
        </ul>
      </div>

      {/*  RIGHT */}
      <div className="navbar-end flex items-center gap-2 sm:gap-3">
        {/*  Theme Toggle */}
        <div className="flex items-center gap-1 sm:gap-2 bg-base-200 px-2 py-1 rounded-full">
          <input
            type="checkbox"
            onChange={(e) => handleTheme(e.target.checked)}
            defaultChecked={localStorage.getItem("theme") === "dark"}
            className="toggle toggle-xs sm:toggle-sm toggle-primary"
          />
        </div>

        {/* USER */}
        {user ? (
          <>
            {/*  Logout */}
            <button
              onClick={handleLogOut}
              className="btn btn-xs sm:btn-sm bg-[#192586] hover:bg-[#27379b] text-white border-none"
            >
              <span className="hidden sm:block">Logout</span>

              <span className="sm:hidden">Out</span>
            </button>

            {/*  Profile */}
            <div
              className="tooltip tooltip-bottom"
              data-tip={user?.displayName}
            >
              <img
                src={
                  user?.photoURL ||
                  "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                }
                alt="profile"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-[#192586] object-cover"
              />
            </div>
          </>
        ) : (
          <>
            {/*  Login */}
            <Link
              to="/login"
              className="btn btn-xs sm:btn-sm btn-ghost text-[#192586]"
            >
              Login
            </Link>

            {/*  Register */}
            <Link
              to="/register"
              className="btn btn-xs sm:btn-sm bg-[#192586] hover:bg-[#27379b] text-white border-none"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
