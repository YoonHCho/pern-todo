import React, { Fragment, useState } from "react";

const InputTodo = () => {
  const [description, setDescription] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      // Create an object with the description property
      const body = { description };
      await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      window.location = "/";
    } catch (error) {
      console.error(error.message);
    }
    // setDescription("");
  };

  return (
    <Fragment>
      <h1 className="text-center mt-5">Simple Todo App Using PERN Stack</h1>
      <form onSubmit={handleSubmit} className="d-flex mt-3">
        <input type="text" className="form-control" value={description} onChange={e => setDescription(e.target.value)} />
        <button className="btn btn-success ml-3">Add</button>
      </form>
    </Fragment>
  );
};

export default InputTodo;
