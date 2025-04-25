import React from "react";
import { useNavigate } from "react-router-dom";

const MarketplaceCard = ({ model }) => {
  const navigate = useNavigate();

  const handleTest = () => {
    navigate("/dashboard", {
      state: { modelName: model.name || model.get("name") },
    });
  };

  const name = model.name || model.get("name");
  const description = model.description || model.get("description");

  return (
    <div className="border border-gray-300 rounded-xl p-8 shadow-lg flex flex-col items-start justify-between bg-white">
      <h2 className="text-xl font-medium mb-2">{name || "Unnamed Model"}</h2>
      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
        {description || "No description provided."}
      </p>
      <button
        onClick={handleTest}
        className="mt-auto bg-indigo-600 text-white px-4 py-2 rounded-lg w-fit hover:bg-indigo-700 hover:cursor-pointer"
      >
        Test
      </button>
    </div>
  );
};

export default MarketplaceCard;
