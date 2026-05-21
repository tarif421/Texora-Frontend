import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdPersonRemoveAlt1 } from "react-icons/md";
import Swal from "sweetalert2";

import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useRole from "../../../../Hooks/useRole";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const updateModalRef = useRef();

  const { isLoading } = useRole();

  // Modal State
  const [selectedUser, setSelectedUser] = useState(null);

  const [selectedRole, setSelectedRole] = useState("");

  // Get Users
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],

    queryFn: async () => {
      const res = await axiosSecure.get("/users");

      return res.data;
    },
  });

  // Open Modal
  const openModal = (user) => {
    setSelectedUser(user);

    setSelectedRole(user.role);

    updateModalRef.current.showModal();
  };

  // Update User
  const handleUpdateUser = async () => {
    const status = selectedRole === "suspend" ? "suspend" : "active";

    const role = selectedRole === "suspend" ? "user" : selectedRole;

    const res = await axiosSecure.patch(`/users/${selectedUser._id}`, {
      role,
      status,
    });

    if (res.data.modifiedCount > 0) {
      updateModalRef.current.close();

      refetch();

      Swal.fire({
        title: "User updated",
        icon: "success",
      });
    }
  };

  // Delete User
  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to remove the user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/users/${user._id}`);

          if (res.data.deletedCount > 0) {
            refetch();

            Swal.fire({
              title: "Deleted!",
              text: "User has been removed.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
          }
        } catch (error) {
          Swal.fire("Error", "Something went wrong!", "error");
        }
      }
    });
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-base-200 p-3 sm:p-5 lg:p-8">
        <div className="max-w-7xl mx-auto bg-base-100 rounded-3xl shadow-sm p-4 sm:p-6">

          {/* Header Skeleton */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div className="h-8 w-48 bg-gray-200 animate-pulse rounded-xl"></div>

            <div className="h-10 w-32 bg-gray-200 animate-pulse rounded-xl"></div>
          </div>

          {/* Table Skeleton */}
          <div className="overflow-x-auto">
            <table className="table min-w-[850px] lg:min-w-full">
              <tbody>
                {[1, 2, 3, 4].map((n) => (
                  <tr key={n}>
                    {Array(7)
                      .fill(0)
                      .map((_, i) => (
                        <td key={i}>
                          <div className="h-8 bg-gray-100 animate-pulse rounded-lg"></div>
                        </td>
                      ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 px-3 py-4 sm:px-5 sm:py-6 lg:px-8">

      <div className="max-w-7xl mx-auto bg-base-100 rounded-3xl shadow-sm p-4 sm:p-6 lg:p-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
              Manage Users
            </h2>

            <p className="text-sm sm:text-base text-gray-500 mt-2">
              Manage roles, status and permissions of all users.
            </p>
          </div>

          <div className="badge badge-primary badge-lg px-4 py-4 font-medium self-start md:self-center">
            Total Users: {users.length}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl border border-base-300">

          <table className="table table-zebra min-w-[950px] lg:min-w-full">

            {/* Table Head */}
            <thead className="bg-base-200 text-gray-700">
              <tr>
                <th className="text-xs sm:text-sm">#</th>
                <th className="text-xs sm:text-sm">User</th>
                <th className="text-xs sm:text-sm">Email</th>
                <th className="text-xs sm:text-sm">Role</th>
                <th className="text-xs sm:text-sm">Status</th>
                <th className="text-center text-xs sm:text-sm">Edit</th>
                <th className="text-center text-xs sm:text-sm">Remove</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user._id}
                  className="hover transition duration-200"
                >
                  {/* Index */}
                  <td className="font-medium text-sm">
                    {index + 1}
                  </td>

                  {/* User */}
                  <td>
                    <div className="flex items-center gap-3">

                      <div className="avatar">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden">
                          <img
                            src={user.photoURL}
                            alt={user.displayName}
                            className="object-cover"
                          />
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-sm sm:text-base text-gray-800">
                          {user.displayName}
                        </h3>
                      </div>
                    </div>
                  </td>

                  {/* Email */}
                  <td>
                    <p className="text-xs sm:text-sm break-all max-w-[220px]">
                      {user.email}
                    </p>
                  </td>

                  {/* Role */}
                  <td>
                    <span className="badge badge-outline badge-sm sm:badge-md">
                      {user.role}
                    </span>
                  </td>

                  {/* Status */}
                  <td>
                    <span
                      className={`badge badge-sm sm:badge-md ${
                        user.status === "suspend"
                          ? "badge-error"
                          : "badge-success"
                      }`}
                    >
                      {user.status || "active"}
                    </span>
                  </td>

                  {/* Edit */}
                  <td className="text-center">
                    <button
                      onClick={() => openModal(user)}
                      className="
                        btn btn-xs sm:btn-sm
                        btn-outline btn-info
                        rounded-xl
                      "
                    >
                      <FaEdit />
                    </button>
                  </td>

                  {/* Delete */}
                  <td className="text-center">
                    <button
                      onClick={() => handleDeleteUser(user)}
                      className="
                        btn btn-xs sm:btn-sm
                        btn-outline btn-error
                        rounded-xl
                      "
                    >
                      <MdPersonRemoveAlt1 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {users.length === 0 && (
          <div className="text-center py-14">

            <h2 className="text-xl sm:text-2xl font-bold text-gray-600">
              No Users Found
            </h2>

            <p className="text-sm sm:text-base text-gray-400 mt-2">
              User data will appear here.
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      <dialog ref={updateModalRef} className="modal px-3">

        <div className="modal-box w-full max-w-lg rounded-3xl p-5 sm:p-7">

          <h3 className="text-xl sm:text-2xl font-bold mb-6">
            Update User
          </h3>

          {selectedUser && (
            <div className="space-y-5">

              {/* Email */}
              <div>
                <p className="font-semibold text-sm sm:text-base mb-2">
                  Email
                </p>

                <div className="bg-base-200 rounded-2xl px-4 py-3 text-sm sm:text-base break-all">
                  {selectedUser.email}
                </div>
              </div>

              {/* Role */}
              <div>
                <label className="font-semibold text-sm sm:text-base">
                  Change Role
                </label>

                <select
                  className="
                    select select-bordered
                    w-full
                    mt-3
                    rounded-2xl
                    text-sm sm:text-base
                  "
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                >
                  <option value="user">User</option>

                  <option value="buyer">Buyer</option>

                  <option value="manager">Manager</option>

                  <option value="admin">Admin</option>

                  <option value="suspend">Suspend</option>
                </select>
              </div>

              {/* Actions */}
              <div className="modal-action flex flex-col sm:flex-row gap-3">

                <button
                  onClick={handleUpdateUser}
                  className="
                    btn btn-primary
                    rounded-2xl
                    flex-1
                  "
                >
                  Update
                </button>

                <form method="dialog" className="flex-1">
                  <button className="btn w-full rounded-2xl">
                    Close
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default ManageUsers;