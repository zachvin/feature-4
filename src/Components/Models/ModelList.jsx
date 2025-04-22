import React from "react";

const ModelList = ({ models, loading }) => {
  return (
    <div className="border border-gray-300 bg-white rounded-xl shadow-lg p-16 col-span-2">
      <h3 className="text-xl mb-4">My Models</h3>

      <div className="flex justify-between font-bold text-gray-500 text-sm gap-4">
        <p className="block w-1/2">Image</p>
        <p className="block w-1/4">Status</p>
        <p className="block w-1/4">Created</p>
      </div>

      {loading ? (
        <p className="mt-4">Loading...</p>
      ) : !models || models.length === 0 ? (
        <p className="mt-4">No models submitted yet.</p>
      ) : (
        models.map((model) => (
          <div key={model.id} className="flex justify-between text-sm gap-4 mt-2 border-b pb-2">
            <p className="block w-1/2 break-words">{model.get("imageName")}</p>
            <p className="block w-1/4 capitalize">{model.get("status") || "N/A"}</p>
            <p className="block w-1/4">{new Date(model.createdAt).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ModelList;
