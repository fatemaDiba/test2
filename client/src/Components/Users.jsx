import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const Users = () => {
  const loadedUsers = useLoaderData();
  const [users, setUsers] = useState(loadedUsers);

  const handleDeleteBtn = (id) => {
    console.log("Delete id : ", id);
    fetch(`https://express-five-khaki.vercel.app/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount > 0) {
          alert("User Successfully Deleted");
          const remainingUsers = users.filter((user) => user._id !== id);
          setUsers(remainingUsers);
        }
      });
  };
  return (
    <div className="container mx-auto w-9/12 font-semibold mt-20">
      <h1 className="text-2xl font-bold"> Users Count: {users.length}</h1>
      <div>
        {users.map((user) => {
          return (
            <p key={user._id}>
              {user.name} : {user.email} :
              <Link to={`/updateUser/${user._id}`}>Update</Link>
              <button onClick={() => handleDeleteBtn(user._id)}>X</button>
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default Users;
