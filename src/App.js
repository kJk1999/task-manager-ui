import React, { useState, useEffect } from 'react';
import AddTicketForm from './AddTicketForm';
import axios from 'axios';
import { useFormik } from 'formik';
import { MdDelete } from "react-icons/md";
const App = () => {
  const formik = useFormik({
    initialValues: {
      selectedOption: '',
    },
    onSubmit: (values) => {
      console.log('values', values);
    },
  });

 

  const [addnewTask, setAddnewTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  const options = [
    { name: 'ManojKumar Margam' },
    { name: 'Bhargav Gollu' },
    { name: 'Vinay Manthani' },
    { name: 'Kandhala Rakesh Reddy' },
    { name: 'Jayanth Vankeepuram' },
    { name: 'Jayakrishna Kuruva' },
    { name: 'Anusha Banthu' },
    { name: 'Prakash Chiluka' },
    { name: 'Vikas' },
    { name: 'Adithya Pampana' },
    { name: 'Meghana Kandala' },
  ];


  useEffect(
    () => {
   axios.get('http://localhost:3000/api/todoslist')
      .then(response => {
        console.log(response, 'response');
        setTasks(response.data);
        setFilteredTasks(response.data); 
      })}, []);

  useEffect(() => {
    if (formik.values.selectedOption) {
      setFilteredTasks(tasks.filter(task => task.name === formik.values.selectedOption));
    } else {
      setFilteredTasks(tasks);
    }
  }, [formik.values.selectedOption, tasks]);

  const handleOptionChange = (event) => {
    formik.setFieldValue('selectedOption', event.target.value);
  };
  const handleRelease=(e)=>{
    console.log()
    const filterdItems = tasks.filter(eachTask => eachTask.release.includes(e.target.value))
    console.log(filterdItems)
    setFilteredTasks(filterdItems)

  }
 
const handleDelete=(id)=> {
axios.delete(`http://localhost:3000/api/todoslist/${id}`)
.then(response => {
console.log(response.data)
setFilteredTasks(response.data)
 
})

}
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full">
        <form onSubmit={formik.handleSubmit}>
          <div className='flex items-center justify-between my-4'>
          <div>
            <label className="block text-xs font-muli mb-1" htmlFor="selectedOption">
              Select Your Name
            </label>
            <select
              id="selectedOption"
              name="selectedOption"
              className={`bg-gray-100 w-full p-1.5 text-xs outline-none ${
                formik.errors.selectedOption && formik.touched.selectedOption ? 'border border-red-500' : ''
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
              <div className="text-red-500 text-xs">{formik.errors.selectedOption}</div>
            )}
          </div>
          <div>
            <label htmlFor='release' className='text-xs block'>release</label>
            <input type="text" id="release" name="release" placeholder="search to release" onChange={handleRelease}/>
          </div>
          </div>
        </form>
        <button
          onClick={() => setAddnewTask(true)}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Add Task
        </button>

        <ul className="mt-6 space-y-4">
          {filteredTasks.map((eachTask) => (
            <li key={eachTask.ticketNumber} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              
              <div className="flex justify-between items-start mb-2">
                <p className="text-gray-700 font-semibold text-lg">{eachTask.name}</p>
                <p className="text-gray-500 text-sm">{eachTask.status}</p>
              </div>

              
              <div className="flex justify-between text-gray-600 text-sm mb-2">
                <p>Ticket Number: {eachTask.ticketNumber}</p>
                <p>Release: {eachTask.release}</p>
              </div>

              
              <div className="flex justify-between items-center text-gray-600 text-sm mb-2">
                <p className="text-gray-700">{eachTask.description}</p>
                <p className='text-2xl cursor-pointer' onClick={()=>handleDelete(eachTask._id)}><MdDelete/></p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {addnewTask &&
        <AddTicketForm
          setAddnewTask={setAddnewTask}
          tasks={tasks}
          setTasks={setTasks}
        />}
    </div>
  );
};

export default App;
