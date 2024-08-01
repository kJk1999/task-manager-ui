import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
const AddTicketForm = ({ setAddnewTask, setTasks }) => {
  const formik = useFormik({
    initialValues: {
      selectedOption: "",
      ticketNumber: "",
      release: "",
      description: "",
    },
    validationSchema: Yup.object().shape({
      selectedOption: Yup.string().required("Please select your name"),
      ticketNumber: Yup.string().required("Ticket number is required"),
      release: Yup.string().required("Release is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: (values) => {
      axios
        .post(`${process.env.REACT_APP_API_URL}/api/todoslist`, {
          name: values.selectedOption,
          ticketNumber: values.ticketNumber,
          release: values.release,
          description: values.description,
        })
        .then((response) => setTasks((pv) => [...pv, response.data]));

      setAddnewTask(false);
    },
  });

  const handleOptionChange = (event) => {
    formik.setFieldValue("selectedOption", event.target.value);
  };

  const options = [
    { name: "ManojKumar Margam" },
    { name: "Bhargav Gollu" },
    { name: "Vinay Manthani" },
    { name: "Kandhala Rakesh Reddy" },
    { name: "Jayanth Vankeepuram" },
    { name: "Jayakrishna Kuruva" },
    { name: "Anusha Banthu" },
    { name: "Prakash Chiluka" },
    { name: "Vikas" },
    { name: "Adithya pampana" },
    { name: "Meghana Kandala" },
  ];

  return (
    <div>
      <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg md:w-5/12 lg:w-4/12 w-full md:mx-0 mx-4">
          <div className="flex justify-between">
            <h1 className="text-center my-3 font-semibold text-xl">
              Please Fill The Form
            </h1>
            <div
              className="cursor-pointer"
              onClick={() => setAddnewTask(false)}
            >
              +
            </div>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <label
              className="block text-xs font-muli mb-1"
              htmlFor="selectedOption"
            >
              Select Your Name
            </label>
            <select
              id="selectedOption"
              name="selectedOption"
              className={`bg-gray-100 w-full p-1.5 text-xs outline-none ${
                formik.errors.selectedOption && formik.touched.selectedOption
                  ? "border border-red-500"
                  : ""
              }`}
              onChange={handleOptionChange}
              onBlur={formik.handleBlur}
              value={formik.values.selectedOption}
            >
              <option value="">Select a name</option>
              {options.map((user) => (
                <option key={user.name} value={user.name}>
                  {user.name}
                </option>
              ))}
            </select>
            {formik.errors.selectedOption && formik.touched.selectedOption && (
              <div className="text-red-500 text-xs">
                {formik.errors.selectedOption}
              </div>
            )}

            <div className="mt-5">
              <label htmlFor="ticketNumber" className="block text-xs">
                Ticket Number
              </label>
              <input
                className={`w-full outline-none bg-gray-100 p-2 ${
                  formik.errors.ticketNumber && formik.touched.ticketNumber
                    ? "border border-red-500"
                    : ""
                }`}
                type="text"
                id="ticketNumber"
                name="ticketNumber"
                placeholder="Enter ticket number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.ticketNumber}
              />
              {formik.errors.ticketNumber && formik.touched.ticketNumber && (
                <div className="text-red-500 text-xs">
                  {formik.errors.ticketNumber}
                </div>
              )}
            </div>

            <div className="mt-5">
              <label htmlFor="release" className="block text-xs">
                Release
              </label>
              <input
                className={`w-full outline-none bg-gray-100 p-2 ${
                  formik.errors.release && formik.touched.release
                    ? "border border-red-500"
                    : ""
                }`}
                type="text"
                id="release"
                name="release"
                placeholder="Enter release"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.release}
              />
              {formik.errors.release && formik.touched.release && (
                <div className="text-red-500 text-xs">
                  {formik.errors.release}
                </div>
              )}
            </div>

            <div className="mt-5">
              <label htmlFor="description" className="block text-xs">
                Description
              </label>
              <textarea
                id="description"
                rows="5"
                cols="5"
                className={`w-full outline-none bg-gray-100 ${
                  formik.errors.description && formik.touched.description
                    ? "border border-red-500"
                    : ""
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
                name="description"
              />
              {formik.errors.description && formik.touched.description && (
                <div className="text-red-500 text-xs">
                  {formik.errors.description}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="bg-blue-400 text-sm w-full py-2 mt-5 rounded-full"
            >
              ADD
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTicketForm;
