import { GiRolledCloth } from "react-icons/gi";
import { Link, NavLink } from "react-router";
import useAuth from "../../Hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const handleLogOut = () => {
    logOut()
      .then(() => console.log("logout success"))
      .catch((err) => console.log(err));
  };

  const handleTheme = (checked) => {
    const html = document.querySelector("html");
    const theme = checked ? "dark" : "light";
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  };

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-[#192586] font-semibold"
              : "hover:text-[#27379b]"
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
              : "hover:text-[#27379b]"
          }
        >
          All Products
        </NavLink>
      </li>

      {/*  dashboard if logged in */}
      {user && (
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "text-[#192586] font-semibold"
                : "hover:text-[#27379b]"
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
              : "hover:text-[#27379b]"
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
              : "hover:text-[#27379b]"
          }
        >
          Contact
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow px-3">

      {/*  LEFT */}
      <div className="navbar-start">

        {/* Mobile menu */}
        <div className="dropdown">
          <div tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>

          <ul className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-50">
            {links}
          </ul>
        </div>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 ml-2">
          <GiRolledCloth className="text-3xl text-[#192586]" />
          <span className="text-2xl font-bold text-[#192586] font-serif">
            Texora
          </span>
        </Link>
      </div>

      {/*  CENTER */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-2 gap-2">
          {links}
        </ul>
      </div>

      {/*  RIGHT */}
      <div className="navbar-end flex items-center gap-3">

        {/*  Theme Toggle */}
        <div className="flex items-center gap-2 bg-base-200 px-2 py-1 rounded-full">
         

          <input
            type="checkbox"
            onChange={(e) => handleTheme(e.target.checked)}
            defaultChecked={localStorage.getItem("theme") === "dark"}
            className="toggle toggle-sm toggle-primary"
          />

         
        </div>

        {/*  User */}
        {user ? (
          <>
            <button
              onClick={handleLogOut}
              className="btn btn-sm bg-blue-800 hover:bg-blue-600 text-white border-none"
            >
              Logout
            </button>

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
                className="w-9 h-9 rounded-full border-2 border-[#192586]"
              />
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-ghost text-[#192586]">
              Login
            </Link>

            <Link
              to="/register"
              className="btn bg-[#192586] hover:bg-[#27379b] text-white"
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