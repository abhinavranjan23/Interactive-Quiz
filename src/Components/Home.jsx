import React, { useEffect } from "react";
import Header from "./Header";
import { Outlet, useNavigate } from "react-router";
import Footer from "./Footer";
import { useDispatch } from "react-redux";
import { addAdmin } from "../redux/Slices/adminSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    authenicateUser();
  }, []);
  const authenicateUser = async () => {
    const res = await fetch("http://localhost:3000/admin/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json ",
      },
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) {
      console.log("Access not granted");
      navigate("/login");
    } else if (res.ok) {
      dispatch(addAdmin(data.admin));
    }
  };

  return (
    <div className='overflow-x-hidden max-w-[100vw]'>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Home;
