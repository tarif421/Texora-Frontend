import { GiRolledCloth } from "react-icons/gi";
import { Link, NavLink } from "react-router";
import useAuth from "../../Hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const handleLogOut = () => {
    logOut()
      .then(() => {
        console.log("logout successfull");
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
          to="/dashboard/all-products"
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

      {/* end */}
      <div className="navbar-end ml-2 flex gap-2">
        {user ? (
          <>
            
            <button
              onClick={handleLogOut}
              className="btn bg-blue-800 hover:bg-blue-600 text-white border-none"
            >
              Log Out
            </button>
            {/* circle/ */}
          
            <div className="tooltip tooltip-bottom" data-tip={user?.displayName}>
      <div className="w-10 h-10">
        <img
          src={user?.photoURL || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} 
          alt="User Profile"
          className="w-full h-full rounded-full object-cover border-2 border-[#192586]"
        />
      </div>
    </div>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="btn btn-ghost text-[#192586] font-semibold border-[#192586] hover:bg-[#19258610]"
            >
              Log In
            </Link>
            <Link to="register" className="btn bg-[#192586] hover:bg-[#27379b] text-white border-none">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
