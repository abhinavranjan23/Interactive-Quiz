import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import Header from "./Header";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { addAdmin } from "../redux/Slices/adminSlice";

const Login = () => {
  const passwordRef = useRef(null);
  const emailRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const admin = useSelector((store) => store.admin);
  useEffect(() => {
    checkUserlogged();
  }, []);
  const checkUserlogged = async () => {
    const res = await fetch("http://localhost:3000/admin/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json ",
      },
      credentials: "include",
    });
    if (res.ok) {
      navigate("/admin");
    }
  };
  const handleLogin = async () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    try {
      const res = await fetch("http://localhost:3000/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
      const data = await res.json();
      if (res.status === 200) {
        dispatch(addAdmin(data.admin));
        navigate("/admin");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: data?.error,
          confirmButtonText: "Login Again",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Header />
      <div className='flex flex-col justify-center items-center h-screen'>
        <fieldset className='fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box'>
          <legend className='fieldset-legend'>Login</legend>

          <label className='fieldset-label'>Email</label>
          <input
            type='email'
            className='input'
            placeholder='Email'
            ref={emailRef}
          />

          <label className='fieldset-label'>Password</label>
          <input
            type='password'
            className='input'
            placeholder='Password'
            ref={passwordRef}
          />

          <button className='btn btn-neutral mt-4' onClick={handleLogin}>
            Login
          </button>

          <div className='flex items-center text-gray-400'>
            <p>
              Didn't have an account ?
              <Link
                to='/admin/signup'
                className='hover:cursor-pointer font-mono  text-white'
              >
                {" "}
                Signup{" "}
              </Link>
            </p>
          </div>
        </fieldset>
      </div>
    </>
  );
};

export default Login;
