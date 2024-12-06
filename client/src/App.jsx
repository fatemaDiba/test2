import { NavLink, Outlet } from "react-router-dom";
import "./App.css";

function App() {
  const handleForm = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const pass = form.password.value;
    const userInfo = { name, email, pass };
    console.log(userInfo);

    fetch("https://express-five-khaki.vercel.app/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          alert("User Added Successfully");
          form.reset();
        }
      });
  };

  return (
    <div className="container mt-20 mx-auto flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold">Express + Mongodb</h1>
      <p>Being alone is better than sitting next to a lover and feel lonely</p>
      <div className="flex gap-5 justify-center mt-4 text-black">
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Register</NavLink>
        <NavLink to="/userCollection">Users</NavLink>
      </div>
      <Outlet></Outlet>
      <form onSubmit={handleForm} className="flex flex-col gap-3 mt-6">
        <input
          type="text"
          name="name"
          className="p-2 border border-black rounded-lg"
          placeholder="enter your name"
        />
        <input
          type="email"
          name="email"
          className="p-2 border border-black rounded-lg"
          placeholder="enter your email"
        />
        <input
          type="password"
          name="password"
          className="p-2 border border-black rounded-lg"
          placeholder="enter your password"
        />
        <button className="bg-blue-200">Add User</button>
      </form>
    </div>
  );
}

export default App;
