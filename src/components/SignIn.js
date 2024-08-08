import React,{useContext, useEffect} from 'react'
import AuthContext from '../utils/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const SignIn = () => {
    const navigate = useNavigate()
    const {isAuthenticated,setIsAuthenticated} = useContext(AuthContext)
    useEffect(()=>{
        if(isAuthenticated){
            navigate('/')
        }
    },[isAuthenticated,navigate])

    const formik = useFormik({
      initialValues: {
        email: "",
        password: "",
        
      },
      validationSchema: Yup.object().shape({
        email: Yup.string().required("Please select your name"),
        password: Yup.string().required("Ticket number is required"),
        
      }),
      onSubmit: (values) => {
        const signInDetails = {
          email:values.email,
          password:values.password
        }
        axios.post("https://task-manager-xgmq.onrender.com/api/signin",signInDetails).then(response=>{
          if(response?.data?.Status==="Success"){
            console.log(response.data)
            localStorage.setItem("JWT_TOKEN",response.data.token)
            setIsAuthenticated(true)
            navigate('/')
            
          }

        })
       
      },
    });
  return (
    <div className='h-screen flex flex-col justify-center items-center'>
      <h1>SIGNIN FORM</h1>
      <div className='flex '>
      <form className='self-center' onSubmit={formik.handleSubmit}>
            <label
              className="block text-xs font-muli mb-1"
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

            <div className="mt-5">
              <label htmlFor="password" className="block text-xs">
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
              Sign In
            </button>
      </form>
      <img src='images/signin.png' className='w-1/2' alt='signin-img'/>

      </div>
        
    </div>
  )
}

export default SignIn
