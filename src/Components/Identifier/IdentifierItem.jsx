import React from "react";

const IdentifierItem = ({ name, scientific, family }) => {
  return (
    <div className="plant">
      <h3>{name}</h3>
      <h4>{scientific}</h4>
      <p>Family: {family}</p>
    </div>
  );
};

export default IdentifierItem;
