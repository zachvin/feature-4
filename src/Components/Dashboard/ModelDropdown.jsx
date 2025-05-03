import React from "react";

const ModelDropdown = ({ models, loading, currentModel, onSelect }) => {
  // curentModel passed down and onSelect passed up, as per data down events up
  return (
    <div className="flex flex-col items-start gap-4 mb-4">
      <select
        value={currentModel?.get("name") || ""}
        onChange={onSelect}
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
