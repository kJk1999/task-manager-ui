import React, { useState, useEffect } from "react";
import AddTicketForm from "./AddTicketForm";
import axios from "axios";
import { useFormik } from "formik";
import { MdDelete } from "react-icons/md";
import "./App.css";
const App = () => {
  const [addnewTask, setAddnewTask] = useState(false);
  const [taskOwner, setTaskOwner] = useState("");
  const [tasks, setTasks] = useState([]);
  const [selectedRelease, setSelectedRelease] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);
  const formik = useFormik({
    initialValues: {
      selectedOption: "",
    },
    onSubmit: (values) => {
      console.log("values", values);
    },
  });

  const options = [
    { name: "Select All" },
    { name: "ManojKumar Margam" },
    { name: "Bhargav Gollu" },
    { name: "Vinay Manthani" },
    { name: "Kandhala Rakesh Reddy" },
    { name: "Jayanth Vankeepuram" },
    { name: "Jayakrishna Kuruva" },
    { name: "Anusha Banthu" },
    { name: "Prakash Chiluka" },
    { name: "Vikas" },
    { name: "Adithya Pampana" },
    { name: "Meghana Kandala" },
  ];

  const statusList = [
    { name: "Open", value: "Open" },
    { name: "In Progress", value: "inprogress" },
    { name: "Bug Fixed", value: "bugfixed" },
    { name: "Released to QA", value: "releasedtoqa" },
  ];

  useEffect(() => {
    axios
      .get(`https://task-manager-xgmq.onrender.com/api/todoslist`)
      .then((response) => {
        console.log(response, "response");
        setTasks(response.data);
        setFilteredTasks(response.data);
      });
  }, []);

  useEffect(() => {
    if (formik.values.selectedOption) {
      console.log("triggered");
      if (formik.values.selectedOption !== "Select All") {
        setFilteredTasks(
          tasks.filter(
            (task) =>
              task.name === formik.values.selectedOption &&
              task.release.includes(selectedRelease)
          )
        );
      } else {
        setFilteredTasks(
          tasks.filter((task) => task.release.includes(selectedRelease))
        );
      }
    } else {
      setFilteredTasks(tasks);
    }
  }, [formik.values.selectedOption, tasks, selectedRelease]);

  const handleOptionChange = (event) => {
    setTaskOwner(event.target.value);
    formik.setFieldValue("selectedOption", event.target.value);
  };
  const handleRelease = (e) => {
    setSelectedRelease(e.target.value);
    console.log(taskOwner, "taskOwner");
    let filterdItems;
    if (taskOwner && taskOwner !== "Select All") {
      filterdItems = tasks.filter(
        (eachTask) =>
          eachTask.release.includes(e.target.value) &&
          eachTask.name === taskOwner
      );
      setFilteredTasks(filterdItems);
    } else {
      setFilteredTasks(
        tasks.filter((eachTask) => eachTask.release.includes(e.target.value))
      );
    }
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://task-manager-xgmq.onrender.com/api/todoslist/${id}`)
      .then((response) => {
        console.log(response.data);
        setFilteredTasks(response.data);
      });
  };
  const handleStatusChange = (id, updatedFields) => {
    console.log(updatedFields);
    axios
      .patch(
        `https://task-manager-xgmq.onrender.com/api/todoslist/${id}`,
        updatedFields
      )
      .then((response) => {
        console.log(response,"data")
        setTasks(response.data);
        setFilteredTasks(response.data);
      });
  };
  return (
    <div className="min-h-screen flex-col items-centerbg-gray-100 p-4">
      <h1 className="text-5xl text-center font-bold">Ticket Tracker</h1>
      <div className=" p-8 w-full">
        <form onSubmit={formik.handleSubmit}>
          <div className="flex items-center justify-between my-4">
            <div className="flex justify-between w-full">
              <button
                onClick={() => setAddnewTask(true)}
                className="bg-blue-500 w-32 text-white rounded hover:bg-blue-600"
              >
                Add Task
              </button>

              <div className="flex justify-end w-full">
                <div className="mr-2">
                  <label
                    className="block text-xs font-muli mb-1"
                    htmlFor="selectedOption"
                  >
                    filter by name
                  </label>
                  <select
                    id="selectedOption"
                    name="selectedOption"
                    className={`bg-gray-100 w-full p-1.5 text-xs border-slate-500 border-solid border rounded  ${
                      formik.errors.selectedOption &&
                      formik.touched.selectedOption
                        ? "border border-red-500"
                        : "border-slate-500 border-solid"
                    }`}
                    onChange={handleOptionChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.selectedOption}
                  >
                    {options.map((user) => (
                      <option key={user.name} value={user.name}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                  {formik.errors.selectedOption &&
                    formik.touched.selectedOption && (
                      <div className="text-red-500 text-xs">
                        {formik.errors.selectedOption}
                      </div>
                    )}
                </div>
                <div>
                  <label htmlFor="release" className="block mb-1 text-xs">
                    release
                  </label>
                  <input
                    type="text"
                    id="release"
                    className="border-slate-500 border-solid border rounded bg-transparent p-1"
                    name="release"
                    placeholder="search release"
                    onChange={handleRelease}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>

        <ul className="mt-6 space-y-4">
          {filteredTasks.map((eachTask) => (
            <li
              key={eachTask.ticketNumber}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
            >
              <div className="flex justify-between items-start mb-2">
                <h1 className="text-gray-700 font-semibold text-lg">
                  {eachTask.ticketNumber}
                </h1>
                <div className="flex justify-between text-lg font-semibold text-gray-600 mb-2">
                  <h3>Release: {eachTask.release}</h3>
                </div>
                <div>
                  <h3>{eachTask.name}</h3>
                </div>
                <select
                  id="options"
                  className=" text-green-500"
                  value={eachTask.status}
                  onChange={(event) =>
                    handleStatusChange(eachTask._id, {
                      status: event.target.value,
                    })
                  }
                >
                  {statusList.map((eachOption) => (
                    <option value={eachOption.value}>{eachOption.name}</option>
                  ))}
                </select>
                <p
                  className="text-2xl cursor-pointer"
                  onClick={() => handleDelete(eachTask._id)}
                >
                  <MdDelete className="delete-icon" />
                </p>
              </div>

              <div className="flex justify-between items-center text-gray-600 text-sm mb-2">
                <p className="text-gray-700">{eachTask.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {addnewTask && (
        <AddTicketForm
          setAddnewTask={setAddnewTask}
          tasks={tasks}
          setTasks={setTasks}
        />
      )}
    </div>
  );
};

export default App;
