import { useNavigate } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import useRole from "../../../Hooks/useRole";
import Swal from "sweetalert2";

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
    <div className="min-h-screen bg-base-200 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">

        <div className="bg-base-100 shadow-xl rounded-2xl p-8">

          {/*  Header */}
          <div className="flex flex-col md:flex-row items-center gap-6 mb-8">

            <img
              src={user?.photoURL || "https://i.ibb.co/2kR3R1K/user.png"}
              alt="profile"
              className="w-28 h-28 rounded-full border"
            />

            <div>
              <h2 className="text-3xl font-bold">
                {user?.displayName || "No Name"}
              </h2>
              <p className="text-gray-500">{user?.email}</p>

              <span className="badge badge-primary mt-2 capitalize">
                {role || "user"}
              </span>
            </div>
          </div>

          {/*  Info section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <Info label="Full Name" value={user?.displayName} />
            <Info label="Email" value={user?.email} />
            <Info label="Role" value={role} />
            <Info label="Account Status" value="Active" />

          </div>

          {/*  Logout Button */}
          <div className="mt-10 text-center">

            <button
              onClick={handleLogout}
              className="btn btn-error text-white px-6"
            >
              Logout
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

/*  reusable info component */
const Info = ({ label, value }) => {
  return (
    <div className="bg-base-200 p-4 rounded-xl">
      <p className="text-xs opacity-60">{label}</p>
      <p className="font-semibold">{value || "N/A"}</p>
    </div>
  );
};

export default MyProfile;