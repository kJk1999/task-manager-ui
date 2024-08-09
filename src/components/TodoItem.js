import React from "react";
import { MdDelete } from "react-icons/md";

const TodoItem = ({
  eachTask,
  handleStatusChange,
  handleDelete,
  statusList,
}) => {
  return (
    <li
      key={eachTask.ticketNumber}
      className="bg-white p-2 rounded-lg shadow-sm border border-gray-200"
    >
      <div className="flex flex-col md:flex-row w-full md:items-start mb-2">
        <div className="flex justify-between w-full md:w-3/5 mb-3 md:mb-0">
          <h1 className="text-gray-700 font-semibold text-xs md:text-lg">
            {eachTask.ticketNumber}
          </h1>
          <div className="flex justify-between text-xs md:text-lg font-semibold text-gray-600">
            <h3>Release: {eachTask.release}</h3>
          </div>

          <select
            id="options"
            className=" text-green-500 text-xs md:text-lg"
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
        </div>
        <div className="flex w-full md:w-2/5 justify-between">
          <div className="md:w-3/4 ">
            <h3 className="text-center  text-xs md:text-lg">{eachTask.name}</h3>
          </div>
          <div
            className="text-xl md:text-2xl cursor-pointer"
            onClick={() => handleDelete(eachTask._id)}
          >
            <MdDelete className="delete-icon" />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center text-gray-600 text-sm mb-2">
        <p className="text-gray-700">{eachTask.description}</p>
      </div>
    </li>
  );
};

export default TodoItem;
