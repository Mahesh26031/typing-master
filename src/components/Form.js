import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Form() {
  const navigate = useNavigate();
  const type = (event) => {
    event.preventDefault();
    // process the form data here
    navigate("/type");
  };

  return (
    <div>
      <form id="form" onSubmit={type}>
        <div className="div-form">
          <h1>Welcome to typing master</h1>
        </div>

        <button type="submit">Start</button>
      </form>
    </div>
  );
}

export default Form;
