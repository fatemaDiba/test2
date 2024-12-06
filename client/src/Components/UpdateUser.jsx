import { useLoaderData } from "react-router-dom";

const UpdateUser = () => {
  const loadedUser = useLoaderData();
  const handleUpdateBtn = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const pass = form.password.value;
    const updateUserInfo = { name, pass };
    console.log(updateUserInfo);
    fetch(`https://express-five-khaki.vercel.app/users/${loadedUser._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateUserInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          alert("Successfully Updated User Information");
        }
      });
  };
  return (
    <div className="font-semibold container mx-auto w-[50%] mt-20">
      <h2 className="text-2xl font-bold mb-4">
        Update information of {loadedUser?.name}
      </h2>
      <form className="flex flex-col gap-3" onSubmit={handleUpdateBtn}>
        <input
          type="text"
          name="name"
          className="p-2 border border-black rounded-lg"
          defaultValue={loadedUser?.name}
        />
        <input
          type="password"
          name="password"
          className="p-2 border border-black rounded-lg"
          defaultValue={loadedUser?.pass}
        />
        <input type="submit" value="Update" />
      </form>
    </div>
  );
};

export default UpdateUser;
