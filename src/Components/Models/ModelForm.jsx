import React, { useState, useCallback } from "react";
import Parse from "parse";
import { uploadModel } from "./ModelService";

const ModelForm = ({ onSubmit }) => {
  const [file, setFile] = useState(null);
  const [endpoint, setEndpoint] = useState("");
  const [inputs, setInputs] = useState([{ name: "", example: "" }]);
  const [dragActive, setDragActive] = useState(false);

  const addInputField = () => {
    setInputs([...inputs, { name: "", example: "" }]);
  };

  const updateInput = (i, key, val) => {
    const updated = [...inputs];
    updated[i][key] = val;
    setInputs(updated);
  };

  const removeInput = (i) => {
    const updated = [...inputs];
    updated.splice(i, 1);
    setInputs(updated);
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files[0];
    if (
      droppedFile &&
      (droppedFile.name.endsWith(".zip") || droppedFile.name.endsWith(".tar"))
    ) {
      setFile(droppedFile);
    } else {
      alert("Please upload a .zip or .tar file.");
    }
  }, []);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const submitModel = async () => {
    const user = Parse.User.current();
    if (!file || !user) return alert("Login and select a file first.");

    try {
      // const parseFile = new Parse.File(file.name, file);
      // await parseFile.save();

      // const DockerModel = Parse.Object.extend("DockerModel");
      // const model = new DockerModel();
      // const imageName = `model-${user.id}-${Date.now()}`;

      // model.set("file", parseFile);
      // model.set("userID", Parse.User.current());
      // model.set("status", "pending");
      // model.set("imageName", imageName);
      // model.set("endpoint", (endpoint || "").trim());
      // model.set(
      //   "inputs",
      //   inputs.map((i) => ({
      //     name: (i.name || "").trim(),
      //     example: (i.example || "").trim(),
      //   }))
      // );
      // model.set("contentType", "application/json");

      // console.log("Saving model...");

      // await model.save();

      console.log("Sending to backend...");

      // send file to backend here
      const formData = new FormData();
      formData.append("file", file);
      formData.append("imageName", "docker-dummy");
      formData.append("imageTag", "v1.0"); // TODO get input for image tag
      formData.append("endpoint", (endpoint || "").trim());
      formData.append("port", 8123); // TODO standardize port naming convention
      formData.append("contentType", "application/json");

      await uploadModel(formData); // Pass the FormData object

      setFile(null);
      setInputs([{ name: "", example: "" }]);
      setEndpoint("");

      if (onSubmit) onSubmit();
    } catch (err) {
      console.error("Error submitting model:", err.message);
    }
  };

  return (
    <div
      className="flex flex-col justify-start border border-gray-300 bg-white rounded-xl shadow-lg p-16 gap-6"
      onDragEnter={handleDrag}
    >
      <h2 className="text-2xl font-medium">Submit a Model</h2>

      <label className="text-sm font-medium">Upload .tar or .zip:</label>

      {/* Drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${
          dragActive ? "border-blue-600 bg-blue-50" : "border-gray-300"
        }`}
      >
        <p className="text-sm text-gray-500 mb-2">Drag & drop your file here</p>
        <label className="bg-blue-100 border border-blue-300 text-blue-600 px-4 py-2 rounded-lg cursor-pointer w-fit hover:bg-blue-200 inline-block">
          Choose File
          <input
            type="file"
            accept=".tar,.zip"
            onChange={(e) => setFile(e.target.files[0])}
            className="hidden"
          />
        </label>
        {file && <p className="text-xs mt-2 text-gray-500">{file.name}</p>}
      </div>

      <label className="text-sm font-medium mt-4">Model endpoint route:</label>
      <input
        type="text"
        value={endpoint}
        onChange={(e) => setEndpoint(e.target.value)}
        placeholder="/predict"
        className="p-3 border border-gray-300 rounded-lg text-sm"
      />

      <input type="hidden" value="application/json" readOnly />

      <div className="space-y-2 mt-4">
        <h3 className="font-medium text-sm">Input Fields</h3>
        {inputs.map((inp, i) => (
          <div key={i} className="flex gap-2 items-center relative">
            <input
              className="p-2 border border-gray-300 rounded w-1/2"
              value={inp.name}
              onChange={(e) => updateInput(i, "name", e.target.value)}
              placeholder="Field name"
            />
            <input
              className="p-2 border border-gray-300 rounded w-1/2"
              value={inp.example}
              onChange={(e) => updateInput(i, "example", e.target.value)}
              placeholder="Example value"
            />
            {inputs.length > 1 && (
              <svg
                onClick={() => removeInput(i)}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-gray-400 fill-gray-300 hover:stroke-red-400 hover:fill-red-300 w-[24px] cursor-pointer"
              >
                <path
                  d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
        ))}
        <button onClick={addInputField} className="text-blue-600 text-sm mt-1">
          + Add input field
        </button>
      </div>

      <button
        onClick={submitModel}
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg w-fit hover:bg-blue-700"
      >
        Submit
      </button>
    </div>
  );
};

export default ModelForm;
