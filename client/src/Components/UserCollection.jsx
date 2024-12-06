import { useState } from "react";
import { useLoaderData } from "react-router-dom";

const UserCollection = () => {
  const loadedUser = useLoaderData();
  const [users, setUsers] = useState(loadedUser);

  const handleDeleteBtn = (id) => {
    fetch(`https://express-five-khaki.vercel.app/users2/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount > 0) {
          alert("User successfully deleted");
          const remainingUser = users.filter((user) => user._id !== id);
          setUsers(remainingUser);
        }
      });
  };

  return (
    <div className="container w-10/12 mx-auto items-center mt-20">
      <h1 className="text-3xl font-bold text-center mb-3">
        User Information Collection of {users.length} User
      </h1>
      <div className="overflow-x-auto border border-black rounded-lg">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>User Created</th>
              <th>Last Signed in</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <tr key={user._id}>
                  <th>{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.createdTime}</td>
                  <td>{user.lastSignInTime}</td>
                  <td>
                    <button className="btn">Update</button>
                    <button
                      onClick={() => handleDeleteBtn(user._id)}
                      className="btn ml-2"
                    >
                      X
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserCollection;
