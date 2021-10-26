import React from "react";

const SortButton = ({ onSort, columnHeader }) => {
  return (
    <div>
      <button onClick={onSort}>{columnHeader}</button>
    </div>
  );
};

export default SortButton;
