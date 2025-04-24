import React from "react";
import { useNavigate } from "react-router-dom";

const MarketplaceCard = ({ model }) => {
  const navigate = useNavigate();

  const handleTest = () => {
    navigate("/dashboard", {
      state: { model: model.toJSON() },
    });
  };

  const name = model.name || model.get("name");
  const description = model.description || model.get("description");

  return (
    <div className="border rounded-2xl p-4 shadow-md flex flex-col items-start justify-between bg-white">
      <h2 className="text-xl font-medium mb-2">{name || "Unnamed Model"}</h2>
      <p className="text-sm text-gray-600 mb-4 line-clamp-3">{description || "No description provided."}</p>
      <button
        onClick={handleTest}
        className="mt-auto bg-blue-600 text-white px-4 py-2 rounded-lg w-fit hover:bg-blue-700"
      >
        Test
      </button>
    </div>
  );
};

export default MarketplaceCard;
