import React, { useState } from "react";
import Projectpop from "./Projectpop";
import ProjectService from "./ProjectService";

const Project = (props) => {
  const [buttonPopup, setButtonPopup] = useState(false);
  return (
    <>
      <h1 className="text-center"> Add New Projects</h1>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => setButtonPopup(true)}
      >
        Add New Project
      </button>

      <table className="table">
        <thead>
          <th>Project Title</th>
          <th>Project Description</th>
          <th>Project Image</th>
          <th>Edit</th>
          <th>Delete</th>
        </thead>
        {<ProjectService></ProjectService>}
      </table>

      <Projectpop
        trigger={buttonPopup}
        settrigger={setButtonPopup}
      ></Projectpop>
    </>
  );
};

export default Project;
