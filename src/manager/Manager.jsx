import React, { useRef, useState, useEffect } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordCheck, setPasswordCheck] = useState([]);
  const ref = useRef(null);
  const Passwordref = useRef();

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast("Copied successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  useEffect(() => {
    const storedPasswords = localStorage.getItem("passwords");
    if (storedPasswords) {
      setPasswordCheck(JSON.parse(storedPasswords));
    }
  }, []);

  const showPassword = () => {
    if (ref.current.src.includes("eye.png")) {
      ref.current.src = "images/eyes.png";
      Passwordref.current.type = "text";
    } else {
      ref.current.src = "images/eye.png";
      Passwordref.current.type = "password";
    }
  };

  const savePassword = () => {
    const id = uuidv4();
    const updatedPasswords = [...passwordCheck, { ...form, id }];
    setPasswordCheck(updatedPasswords);
    localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
    setForm({ site: "", username: "", password: "" })
    toast("Saved successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  const deletePassword = (id) => {
    if (confirm("Are you sure you want to delete this password?")) {
      const updatedPasswords = passwordCheck.filter((item) => item.id !== id);
      setPasswordCheck(updatedPasswords);
      localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
      toast("Deleted successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const editPassword = (id) => {
    const passwordToEdit = passwordCheck.find((item) => item.id === id);
    setForm(passwordToEdit);
    const updatedPasswords = passwordCheck.filter((item) => item.id !== id);
    setPasswordCheck(updatedPasswords);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />

      <div className="relative h-screen w-full bg-green-50">
        <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
        </div>
        <div className="p-3 md:mycontainer min-h-[88.2vh]">
          <h1 className="text-4xl font-bold text-center">
            <span className="text-green-500">&lt;</span>
            <span>Pass</span>
            <span className="text-green-500">OP/&gt;</span>
          </h1>
          <p className="text-green-900 text-lg text-center">
            Your own Password Manager
          </p>

          <div className="flex flex-col p-4 text-black gap-8 items-center">
            <input
              value={form.site}
              onChange={handleChange}
              placeholder="Enter website URL"
              className="rounded-full border border-green-500 w-full p-4 py-1"
              type="text"
              name="site"
              id="site"
            />
            <div className="flex flex-col md:flex-row w-full justify-between gap-8">
              <input
                value={form.username}
                onChange={handleChange}
                placeholder="Enter Username"
                className="rounded-full border border-green-500 w-full p-4 py-1"
                type="text"
                name="username"
                id="username"
              />
              <div className="relative">
                <input
                  ref={Passwordref}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter Password"
                  className="rounded-full border border-green-500 w-full p-4 py-1"
                  type="password"
                  name="password"
                  id="password"
                />
                <span
                  className="absolute right-[3px] top-[4px] cursor-pointer"
                  onClick={showPassword}
                >
                  <img
                    ref={ref}
                    className="p-1"
                    width={26}
                    src="images/eye.png"
                    alt="eye"
                  />
                </span>
              </div>
            </div>
            <button
              onClick={savePassword}
              className="flex justify-center items-center gap-2 bg-green-400 hover:bg-green-300 rounded-full px-6 py-1 w-fit border border-green-900"
            >
              <lord-icon
                src="https://cdn.lordicon.com/jgnvfzqg.json"
                trigger="hover"
              ></lord-icon>
              Save
            </button>
          </div>
          <div className="Passwprd">
            <h2 className="text-2xl font-bold p-2">Your Passwords</h2>
            {passwordCheck.length === 0 && <div>No Password To show</div>}
            {passwordCheck.length !== 0 && (
              <table className="table-fixed border border-green-400 w-full rounded-md overflow-hidden">
                <thead className="bg-green-700 text-white">
                  <tr>
                    <th className="border border-white text-center min-w-32 py-2">
                      Site
                    </th>
                    <th className="border border-white text-center min-w-32 py-2">
                      Username
                    </th>
                    <th className="border border-white text-center min-w-32 py-2">
                      Password
                    </th>
                    <th className="border border-white text-center min-w-32 py-2">
                      Edit/Delete
                    </th>
                  </tr>
                </thead>
                <tbody className="border bg-green-100">
                  {passwordCheck.map((item, id) => (
                    <tr key={id}>
                      <td className="border border-white text-center min-w-32 py-2 justify-center items-center gap-5">
                        <div className="flex flex-row justify-evenly items-center">
                          <a
                            href={item.site}
                            target="_blank"
                            className="text-blue-500 hover:underline"
                          >
                            {item.site}
                          </a>
                          <span
                            className="cursor-pointer material-symbols-outlined"
                            onClick={() => {
                              copyText(item.site);
                            }}
                          >
                            content_copy
                          </span>
                        </div>
                      </td>
                      <td className="border border-white text-center min-w-32 py-2 justify-center items-center gap-5">
                        <div className="flex flex-row justify-evenly items-center">
                          {item.username}
                          <span
                            className="cursor-pointer material-symbols-outlined"
                            onClick={() => {
                              copyText(item.username);
                            }}
                          >
                            content_copy
                          </span>
                        </div>
                      </td>
                      <td className="border border-white text-center min-w-32 py-2">
                        <div className="flex flex-row justify-evenly items-center">
                          {item.password}
                          <span
                            className="cursor-pointer material-symbols-outlined"
                            onClick={() => {
                              copyText(item.password);
                            }}
                          >
                            content_copy
                          </span>
                        </div>
                      </td>
                      <td className="border border-white text-center min-w-32 py-2">
                        <div className="flex flex-row justify-center items-center gap-3">
                          <span
                            className="cursor-pointer"
                            onClick={() => {
                              editPassword(item.id);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/zfzufhzk.json"
                              trigger="hover"
                              stroke="bold"
                              colors="primary:#242424,secondary:#ffc738,tertiary:#ebe6ef,quaternary:#f9c9c0,quinary:#242424"
                              style={{ width: "25px", height: "25px" }}
                            ></lord-icon>
                          </span>
                          <span
                            className="cursor-pointer"
                            onClick={() => {
                              deletePassword(item.id);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/skkahier.json"
                              trigger="hover"
                              stroke="bold"
                              colors="primary:#242424,secondary:#ffc738,tertiary:#ebe6ef,quaternary:#f9c9c0,quinary:#242424"
                              style={{ width: "25px", height: "25px" }}
                            ></lord-icon>
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
