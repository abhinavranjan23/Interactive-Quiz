import React from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router";
import { removeAdmin } from "../redux/Slices/adminSlice";

const Header = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlelogOut = async () => {
    const res = await fetch("http://localhost:3000/admin/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    dispatch(removeAdmin());
    navigate("/login");
  };
  return (
    <div className='navbar bg-base-100 shadow-sm'>
      <div className='flex-1'>
        <a className='btn btn-ghost text-xl'>BrainRush</a>
      </div>
      <div
        className={`flex items-center  gap-5 mr-5 ${
          location.pathname == "/login" || location.pathname == "/signup"
            ? "hidden"
            : "visible"
        } `}
      >
        <div className=' p-2 dark:bg-cyan-950 dark:text-cyan-100 rounded-md hover:bg-cyan-100 hover:text-cyan-900'>
          <Link to='/insertquizes' className=''>
            Insert Quizes
          </Link>
        </div>
        <div className='dropdown dropdown-end'>
          <div
            tabIndex={0}
            role='button'
            className='btn btn-ghost btn-circle avatar'
          >
            <div className='w-10 rounded-full'>
              <img
                alt='Tailwind CSS Navbar component'
                src='https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className='menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow'
          >
            <li>
              <a className='justify-between'>
                Profile
                <span className='badge'>New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <button onClick={handlelogOut}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
