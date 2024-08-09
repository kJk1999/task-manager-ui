import React, { useState, useEffect } from "react";
import AddTicketForm from "./AddTicketForm";
import axios from "axios";
import { useFormik } from "formik";
import TodoItem from "./TodoItem";

const TodosContainer = () => {
  const [addnewTask, setAddnewTask] = useState(false);

  const [taskOwner, setTaskOwner] = useState("Select All");
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
    if (taskOwner) {
      console.log("triggered");
      if (taskOwner !== "Select All") {
        setFilteredTasks(
          tasks.filter(
            (task) =>
              task.name === taskOwner &&
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
  }, [taskOwner, tasks, selectedRelease]);

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
      .delete(`https://task-manager-xgmq.onrender.com/api/todoslist/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("JWT_TOKEN")}`,
        },
      })
      .then((response) => {
        setFilteredTasks(response.data);
      })
      .catch((err) => {
        if (err.response.data === "Unauthorized to delete this Todo Item") {
          alert("you can modify your tasks only!");
        }
      });
  };
  const handleStatusChange = (id, updatedFields) => {
    console.log(updatedFields);
    axios
      .patch(
        `https://task-manager-xgmq.onrender.com/api/todoslist/${id}`,
        updatedFields,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("JWT_TOKEN")}`,
          },
        }
      )
      .then((response) => {
        console.log(response, "data");
        setTasks(response.data);
        setFilteredTasks(response.data);
      })
      .catch(err=>{
           if(err?.response?.data?.message=== "You can only modify your todos"){
              alert(err.response.data.message)
           }
      })
  };
  return (
    <div className="min-h-screen flex-col items-centerbg-gray-100 p-4">
      <h1 className="text-xl md:text-5xl text-center font-bold">Ticket Tracker</h1>
      <div className="pt-8 lg:p-8 w-full">
        <div className="flex lg:justify-space-between">
          <form onSubmit={formik.handleSubmit} className="self-center">
            <div>
              <button
                onClick={() => setAddnewTask(true)}
                className="bg-blue-500 w-20  md:w-32 text-white rounded hover:bg-blue-600 p-1 md:p-3"
              >
                Add Task
              </button>
            </div>
          </form>
          <div className=" ml-4 md:ml-0 flex flex-col md:flex-row justify-end w-full">
            <div className="mr-2">
              <label
                className="block text-sm md:text-lg font-muli mb-1"
                htmlFor="selectedOption"
              >
                filter by name
              </label>
              <select
                id="selectedOption"
                name="selectedOption"
                className={`bg-gray-100 w-full p-1.5  text-sm md:text-lg border-slate-500 border-solid border rounded  ${
                  formik.errors.selectedOption && formik.touched.selectedOption
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
              <label htmlFor="release" className="block mb-1  text-sm md:text-lg">
                release
              </label>
              <input
                type="text"
                id="release"
                className="border-slate-500 border-solid border  text-sm md:text-lg rounded bg-transparent p-1"
                name="release"
                placeholder="search release"
                onChange={handleRelease}
              />
            </div>
          </div>
        </div>

        <ul className="mt-6 space-y-4">
          {filteredTasks.map((eachTask) => (
            <TodoItem
              eachTask={eachTask}
              handleDelete={handleDelete}
              handleStatusChange={handleStatusChange}
              statusList={statusList}
            />
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

      {filteredTasks.length === 0 && (
        <div className="flex justify-center items-center">
          No related Tasks{" "}
        </div>
      )}
    </div>
  );
};

export default TodosContainer;
