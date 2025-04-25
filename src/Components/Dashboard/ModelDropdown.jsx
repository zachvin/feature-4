import React, { useState } from "react";

const ModelDropdown = ({ models, loading, onSelect }) => {
  const [currentModel, setCurrentModel] = useState(null);
  const handleModelChange = (event) => {
    setCurrentModel(event.target.value);
    console.log("Selected Model:", event.target.value);
    onSelect(event.target.value);
  };

  return (
    <div className="flex flex-col items-start gap-4 mb-4">
      <select
        value={currentModel || ""}
        onChange={handleModelChange}
        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-700 w-xs"
      >
        <option value="" disabled hidden>
          Select a model
        </option>
        {loading ? (
          <option>Loading...</option>
        ) : (
          models.map((model) => (
            <option key={model.id} value={model.get("name")}>
              {model.get("name")}
            </option>
          ))
        )}
      </select>
    </div>
  );
};

export default ModelDropdown;
