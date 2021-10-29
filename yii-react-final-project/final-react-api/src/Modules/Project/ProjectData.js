import axios from "axios";
import React, { useState, useEffect } from "react";

function ProjectData() {
  const getProjectData = () => {
    useEffect(async () => {
      const response = await axios
        .get("http://localhost:8080/project")
        .then((res) => setProjectData(res.data.items));
    }, []);

  };

  return();
}

export default ProjectData;
