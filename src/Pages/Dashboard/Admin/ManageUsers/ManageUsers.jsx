import React from "react";
 import { FaEdit } from "react-icons/fa";

const ManageUsers = () => {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">Hart Hagerty</div>
                  </div>
                </div>
              </td>
              <td>here email</td>
              <td>here role</td>
              <td>Status</td>
              <td>
                {/* The button to open modal */}
                 <button
                    onClick={() => openModal(user)}
                    className="btn btn-sm btn-outline"
                  >
                    <FaEdit/>
                  </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ManageUsers;

// import { useQuery } from "@tanstack/react-query";
// import { useState } from "react";
// import { FaEdit } from "react-icons/fa";
// import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

// const ManageUsers = () => {
//   const axiosSecure = useAxiosSecure();

//   // modal state
//   const [selectedUser, setSelectedUser] = useState(null);

//   const [selectedRole, setSelectedRole] = useState("");

//   // get users
//   const { data: users = [], refetch } = useQuery({
//     queryKey: ["users"],

//     queryFn: async () => {
//       const res = await axiosSecure.get("/users");

//       return res.data;
//     },
//   });

//   // open modal
//   const openModal = (user) => {
//     setSelectedUser(user);

//     setSelectedRole(user.role);

//     document.getElementById("my_modal_5").showModal();
//   };

//   // update role
//   const handleUpdateUser = async () => {
//     const status = selectedRole === "suspend" ? "suspend" : "active";

//     const role = selectedRole === "suspend" ? "user" : selectedRole;

//     const res = await axiosSecure.patch(
//       `/users/${selectedUser._id}`,

//       {
//         role,
//         status,
//       },
//     );

//     if (res.data.modifiedCount > 0) {
//       refetch();

//       document.getElementById("my_modal_5").close();
//     }
//   };

//   return (
//     <div>
//       <h2 className="text-3xl font-bold mb-5">Manage Users</h2>

//       <div className="overflow-x-auto">
//         <table className="table">
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Email</th>
//               <th>Role</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {users.map((user, index) => (
//               <tr key={user._id}>
//                 <td>{index + 1}</td>

//                 <td>{user.email}</td>

//                 <td>{user.role}</td>

//                 <td>
//                   <span
//                     className={`badge ${
//                       user.status === "suspend"
//                         ? "badge-error"
//                         : "badge-success"
//                     }`}
//                   >
//                     {user.status || "active"}
//                   </span>
//                 </td>

//                 <td>
//                   <button
//                     onClick={() => openModal(user)}
//                     className="btn btn-sm btn-outline"
//                   >
//                     <FaEdit />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* modal */}
//       <dialog id="my_modal_5" className="modal">
//         <div className="modal-box">
//           <h3 className="font-bold text-xl mb-4">Update User</h3>

//           {selectedUser && (
//             <div className="space-y-4">
//               <div>
//                 <p className="font-semibold">Email:</p>

//                 <p>{selectedUser.email}</p>
//               </div>

//               <div>
//                 <label className="font-semibold">Change Role</label>

//                 <select
//                   className="select select-bordered w-full mt-2"
//                   value={selectedRole}
//                   onChange={(e) => setSelectedRole(e.target.value)}
//                 >
//                   <option value="user">User</option>

//                   <option value="buyer">Buyer</option>

//                   <option value="manager">Manager</option>

//                   <option value="admin">Admin</option>

//                   <option value="suspend">Suspend</option>
//                 </select>
//               </div>

//               <div className="modal-action">
//                 <button onClick={handleUpdateUser} className="btn btn-primary">
//                   Update
//                 </button>

//                 <form method="dialog">
//                   <button className="btn">Close</button>
//                 </form>
//               </div>
//             </div>
//           )}
//         </div>
//       </dialog>
//     </div>
//   );
// };

// export default ManageUsers;
