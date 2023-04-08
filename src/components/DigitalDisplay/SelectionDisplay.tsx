import React from "react";

const SelectionDisplay = (props: any) => {
  return (
    <div className="selection">
      <p>Selection:</p> <p>{props.selected}</p>
    </div>
  );
};

export default SelectionDisplay;
