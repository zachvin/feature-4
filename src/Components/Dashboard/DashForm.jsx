import React from "react";
import { useEffect } from "react";

const DashForm = ({ onSubmit, onChange, fields }) => {
  useEffect(() => {
    console.log(fields);
  }, []);

  return (
    <form
      onSubmit={onSubmit}
      autoComplete="off"
      className="flex flex-col gap-4"
    >
      <div>
        <label className="block font-bold text-xl mb-1">2. Data input</label>
        {fields &&
          fields.map((field) => (
            <input
              type="text"
              id="text-input"
              key={field.name}
              placeholder={field.name}
              onChange={onChange}
              name={field.name}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              required
            />
          ))}
      </div>
      <button
        type="submit"
        className="btn btn-primary w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors cursor-pointer"
        onSubmit={onSubmit}
      >
        Send Data to API
      </button>
    </form>
  );
};

export default DashForm;
