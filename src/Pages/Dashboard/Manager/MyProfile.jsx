import { useNavigate } from "react-router";
import Swal from "sweetalert2";

import useAuth from "../../../Hooks/useAuth";
import useRole from "../../../Hooks/useRole";

const MyProfile = () => {
  const { user, logOut } = useAuth();

  const { role } = useRole();

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logOut();

    Swal.fire({
      icon: "success",
      title: "Logged out successfully",
      showConfirmButton: false,
      timer: 1200,
    });

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-base-200 px-3 py-4 sm:px-5 sm:py-6 lg:px-8">

      <div className="max-w-5xl mx-auto">

        {/* Main Card */}
        <div className="bg-base-100 rounded-3xl shadow-sm p-5 sm:p-7 lg:p-10">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center gap-6 lg:gap-8 mb-10">

            {/* Profile Image */}
            <div className="flex justify-center md:justify-start">

              <img
                src={
                  user?.photoURL ||
                  "https://i.ibb.co/2kR3R1K/user.png"
                }
                alt="profile"
                className="
                  w-24 h-24
                  sm:w-28 sm:h-28
                  lg:w-32 lg:h-32
                  rounded-full
                  border-4 border-base-300
                  object-cover
                  shadow-sm
                "
              />
            </div>

            {/* User Info */}
            <div className="text-center md:text-left">

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
                {user?.displayName || "No Name"}
              </h2>

              <p className="text-sm sm:text-base text-gray-500 mt-2 break-all">
                {user?.email}
              </p>

              <span className="badge badge-primary badge-md sm:badge-lg mt-4 capitalize px-4 py-3">
                {role || "user"}
              </span>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">

            <Info
              label="Full Name"
              value={user?.displayName}
            />

            <Info
              label="Email"
              value={user?.email}
            />

            <Info
              label="Role"
              value={role}
            />

            <Info
              label="Account Status"
              value="Active"
            />
          </div>

          {/* Logout */}
          <div className="mt-10 flex justify-center">

            <button
              onClick={handleLogout}
              className="
                btn btn-error
                text-white
                rounded-2xl
                px-6 sm:px-8
                btn-sm sm:btn-md
                shadow-sm
              "
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* Reusable Info Component */
const Info = ({ label, value }) => {
  return (
    <div
      className="
        bg-base-200
        rounded-2xl
        p-4 sm:p-5
        transition
        hover:shadow-sm
      "
    >
      <p className="text-xs sm:text-sm text-gray-500 mb-2">
        {label}
      </p>

      <p className="font-semibold text-sm sm:text-base lg:text-lg text-gray-800 break-all">
        {value || "N/A"}
      </p>
    </div>
  );
};

export default MyProfile;