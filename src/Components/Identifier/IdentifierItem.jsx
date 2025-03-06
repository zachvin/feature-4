import React from "react";

const IdentifierItem = ({name, scientific }) => {
  return (
    <div className="plant">
        <h3>{name}</h3>
        <h4>{scientific}</h4>
    </div>
  );
};

export default IdentifierItem;
