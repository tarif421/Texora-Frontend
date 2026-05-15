import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { FaEdit } from "react-icons/fa";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { MdPersonRemoveAlt1 } from "react-icons/md";
import useRole from "../../../../Hooks/useRole";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const updateModalRef = useRef();
  const { isLoading } = useRole();

  // modal state
  const [selectedUser, setSelectedUser] = useState(null);

  const [selectedRole, setSelectedRole] = useState("");

  // get users
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],

    queryFn: async () => {
      const res = await axiosSecure.get("/users");

      return res.data;
    },
  });

  // open modal
  const openModal = (user) => {
    setSelectedUser(user);

    setSelectedRole(user.role);

    updateModalRef.current.showModal();
  };

  // update role
  const handleUpdateUser = async () => {
    const status = selectedRole === "suspend" ? "suspend" : "active";

    const role = selectedRole === "suspend" ? "user" : selectedRole;

    const res = await axiosSecure.patch(
      `/users/${selectedUser._id}`,

      {
        role,
        status,
      },
    );

    if (res.data.modifiedCount > 0) {
      updateModalRef.current.close();
      refetch();
      Swal.fire({
        title: "User updated",
        icon: "success",
        draggable: true,
      });
    }
  };
  //  delete user

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        {/* Header Skeleton */}
        <div className="flex justify-between items-center mb-6">
          <div className="h-8 w-48 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-10 w-32 bg-gray-200 animate-pulse rounded"></div>
        </div>

        {/* Table Skeleton */}
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="bg-gray-100">
                {[
                  "Image",
                  "Name",
                  "Price",
                  "Category",
                  "Stock",
                  "Home",
                  "Actions",
                ].map((h) => (
                  <th key={h} className="h-12 bg-gray-50"></th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((n) => (
                <tr key={n}>
                  {Array(7)
                    .fill(0)
                    .map((_, i) => (
                      <td key={i}>
                        <div className="h-8 bg-gray-100 animate-pulse rounded"></div>
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  const handleDeleteUser = async (user) => {
    try {
      const res = await axiosSecure.delete(`/users/${user}`);
      if (res.data.deletedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User deleted successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("delete error", error);
    }
  };
  return (
    <div>
      <h2 className="text-3xl font-bold mb-5">Manage Users</h2>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={user.photoURL}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.displayName}</div>
                    </div>
                  </div>
                </td>

                <td>{user.email}</td>

                <td>{user.role}</td>

                <td>
                  <span
                    className={`badge ${
                      user.status === "suspend"
                        ? "badge-error"
                        : "badge-success"
                    }`}
                  >
                    {user.status || "active"}
                  </span>
                </td>

                <td className="w-0.5">
                  <button
                    onClick={() => openModal(user)}
                    className="btn btn-sm btn-outline"
                  >
                    <FaEdit />
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="btn btn-sm btn-outline "
                  >
                    {" "}
                    <MdPersonRemoveAlt1 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* modal */}
      <dialog ref={updateModalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-xl mb-4">Update User</h3>

          {selectedUser && (
            <div className="space-y-4">
              <div>
                <p className="font-semibold">Email:</p>

                <p>{selectedUser.email}</p>
              </div>

              <div>
                <label className="font-semibold">Change Role</label>

                <select
                  className="select select-bordered w-full mt-2"
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

              <div className="modal-action">
                <button onClick={handleUpdateUser} className="btn btn-primary">
                  Update
                </button>

                <form method="dialog">
                  <button className="btn">Close</button>
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
