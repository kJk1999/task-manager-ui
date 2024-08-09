import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../utils/AuthContext";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const SIgnUp = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const [err, setErr] = useState("");
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      fullName: Yup.string().required("Please select your name"),
      email: Yup.string().required("Please select your email"),
      password: Yup.string().required("password  is required"),
    }),
    onSubmit: (values) => {
      const signUpDetails = {
        fullName: values.fullName,
        email: values.email,
        password: values.password,
      };
      try {
        axios
          .post(
            "https://task-manager-xgmq.onrender.com/api/signup",
            signUpDetails
          )
          .then((response) => {
            if (response?.data?.Status === "Success") {
              navigate("/signin");
              console.log("signup Success");
            } else {
              setErr(response.data.message);
              formik.errors.email = response.data.message;
            }
          })
          .catch((err) => {
            if (err.response.data.message) {
            }
          });
      } catch (err) {
        console.log(err);
      }
    },
  });
  return (
    <div className="min-h-screen m-10 md:m-0 flex flex-col justify-center items-center">
      <div className="flex flex-col items-center md:flex md:flex-row md:justify-center">
        <div className="self-center my-4 md:mx-4 shadow-2xl p-5 md:w-1/2">
          <h1 className="text-xl md:text-xl text-center font-semibold">SIGNUP FORM</h1>
          <form className="mt-3" onSubmit={formik.handleSubmit}>
            <div>
              <label
                className="block text-lg font-muli mb-1"
                htmlFor="selectedOption"
              >
                FullName
              </label>
              <input
                className={`w-full outline-none bg-gray-100 p-2 ${
                  formik.errors.fullName && formik.touched.fullName
                    ? "border border-red-500"
                    : ""
                }`}
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Enter FullName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fullName}
              />

              {formik.errors.fullName && formik.touched.fullName && (
                <div className="text-red-500 text-xs">
                  {formik.errors.fullName}
                </div>
              )}
            </div>
            <div>
              <label
                className="block text-lg font-muli mb-1"
                htmlFor="selectedOption"
              >
                Email
              </label>
              <input
                className={`w-full outline-none bg-gray-100 p-2 ${
                  formik.errors.email && formik.touched.email
                    ? "border border-red-500"
                    : ""
                }`}
                type="email"
                id="email"
                name="email"
                placeholder="Enter Email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />

              {formik.errors.email && formik.touched.email && (
                <div className="text-red-500 text-xs">
                  {formik.errors.email}
                </div>
              )}
            </div>

            <div className="mt-5">
              <label htmlFor="password" className="block text-lg">
                password
              </label>
              <input
                className={`w-full outline-none bg-gray-100 p-2 ${
                  formik.errors.password && formik.touched.password
                    ? "border border-red-500"
                    : ""
                }`}
                type="password"
                id="password"
                name="password"
                placeholder="Enter Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.errors.password && formik.touched.password && (
                <div className="text-red-500 text-xs">
                  {formik.errors.password}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="bg-blue-400 text-sm w-full py-2 mt-5 rounded-full"
            >
              Sign Up
            </button>
            {err && (
              <p>
                {err} please <a href="/signin">Signin</a>
              </p>
            )}
          </form>
        </div>
        <div className="md:w-1/2">
          <img src="images/sign-up.png" alt="signin-img" />
        </div>
      </div>
    </div>
  );
};

export default SIgnUp;
