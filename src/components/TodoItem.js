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
  );
};

export default TodoItem;
