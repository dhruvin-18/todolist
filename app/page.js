"use client";
import React, { useState } from "react";

const page = () => {
  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");
  const [mainTask, setMainTask] = useState([]);
  const [updateIndex, setUpdateIndex] = useState(null); // Track the index of the task being updated

  const submitHandler = (e) => {
    e.preventDefault();
    if (updateIndex !== null) {
      // Update the existing task
      let copytask = [...mainTask];
      copytask[updateIndex] = { title, desc };
      setMainTask(copytask);
      setUpdateIndex(null); // Reset the update index
    } else {
      // Add a new task
      setMainTask([...mainTask, { title, desc }]);
    }
    settitle(""); // Clear the input fields
    setdesc("");
  };

  const deleteHandler = (i) => {
    let copytask = [...mainTask];
    copytask.splice(i, 1);
    setMainTask(copytask);
  };

  const updateHandler = (i) => {
    // Populate the input fields with the selected task's data
    settitle(mainTask[i].title);
    setdesc(mainTask[i].desc);
    setUpdateIndex(i); // Set the index of the task being updated
  };

  let renderTask = <h2>No Task Available</h2>;
  if (mainTask.length > 0) {
    renderTask = mainTask.map((t, i) => {
      return (
        <li key={i} className="flex items-center justify-between mb-5">
          <div className="flex items-center justify-between w-2/3">
            <h5 className="text-2xl font-semibold">{t.title}</h5>
            <h6 className="text-lg font-medium">{t.desc}</h6>
          </div>
          <button
            className="bg-blue-400 text-white px-4 py-2 rounded font-bold cursor-pointer"
            onClick={() => updateHandler(i)}
          >
            Update
          </button>
          <button
            className="bg-red-400 text-white px-4 py-2 rounded font-bold cursor-pointer"
            onClick={() => deleteHandler(i)}
          >
            Delete
          </button>
        </li>
      );
    });
  }

  return (
    <>
      <h1 className="bg-black text-white p-5 text-21x font-bold text-center">
        Todo List
      </h1>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          className="text-2x1 border-zinc-800 border-4 m-8 px-4 py-2"
          placeholder="Enter Title here"
          value={title}
          onChange={(e) => {
            settitle(e.target.value);
          }}
        />
        <input
          type="text"
          className="text-2x1 border-zinc-800 border-4 m-8 px-4 py-2"
          placeholder="Enter Description here"
          value={desc}
          onChange={(e) => {
            setdesc(e.target.value);
          }}
        />

        <button className="bg-black text-white px-4 py-2 text-2x1 font-bold rounded m-5 cursor-pointer">
          {updateIndex !== null ? "Update Task" : "Add Task"}
        </button>
      </form>
      {mainTask.length > 0 && (
        <button
          className="bg-red-500 text-white px-4 py-2 text-2x1 font-bold rounded m-5 cursor-pointer"
          onClick={() => setMainTask([])} // Clear all tasks
        >
          Delete All
        </button>
      )}
      <hr />
      <div className="p-8 bg-slate-200">
        <ul>{renderTask}</ul>
      </div>
    </>
  );
};

export default page;
