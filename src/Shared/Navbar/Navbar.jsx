
import { GiRolledCloth } from "react-icons/gi";
import { Link, NavLink } from "react-router";


const Navbar = () => {





  const links = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-[#192586] font-semibold" : "hover:text-[#27379b]"
          }
          to="/"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/allProducts"
          className={({ isActive }) =>
            isActive ? "text-[#192586] font-semibold" : "hover:text-[#27379b]"
          }
        >
          All Products
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "text-[#27379b] font-semibold" : "hover:text-[#27379b]"
          }
        >
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/my-event"
          className={({ isActive }) =>
            isActive ? "text-[#27379b] font-semibold" : "hover:text-[#27379b]"
          }
        >
          About US
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/my-event"
          className={({ isActive }) =>
            isActive ? "text-[#27379b] font-semibold" : "hover:text-[#27379b]"
          }
        >
          Contact
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
      {/* START */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>

        <span className="text-4xl text-[#192586]">
          <GiRolledCloth />
        </span>
        <p className="font-serif text-3xl font-bold text-[#192586]">Texora</p>
      </div>

      {/* CENTER */}
      <div className="navbar-center  hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      {/* END */}
      <div className="navbar-end ml-2 flex gap-2">
        {/* {!user ? (
          <>
            <Link to="/auth/register">
              <button className="btn bg-[#192586] text-white">Register</button>
            </Link>
            <Link to="/auth/login">
              <button className="btn bg-[#192586] text-white">Login</button>
            </Link>
          </>
        ) : (
          <button
           
            className="btn bg-[#192586] text-white"
          >
            Logout
          </button>
        )} */}
      </div>
    </div>
  );
};

export default Navbar;
