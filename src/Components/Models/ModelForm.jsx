import React, { useState, useCallback } from "react";
// import { uploadModel } from "./ModelService";
import { ClipLoader } from "react-spinners";
import { readUser } from "../../Services/auth";
import { newParseModel, uploadModel } from "../../Services/model";

const ModelForm = ({ onSubmit }) => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [endpoint, setEndpoint] = useState("");
  const [fields, setFields] = useState([{ name: "", type: "string" }]);
  const [dragActive, setDragActive] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // handle changes to fields in form
  const addField = () => {
    setFields([...fields, { name: "", type: "string" }]);
  };

  const updateField = (i, key, val) => {
    const updated = [...fields];
    updated[i][key] = val;
    setFields(updated);
  };

  const removeField = (i) => {
    const updated = [...fields];
    updated.splice(i, 1);
    setFields(updated);
  };

  // callback for file drag and drop
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    // only allow .tar files
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/tar") {
      setFile(droppedFile);
    } else {
      alert("Please upload a .tar file.");
    }
  }, []);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    // flags used for styling when file is dragged into/over submission area
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const submitModel = async () => {
    const user = readUser();
    if (!file || !user) return alert("Login and select a file first.");

    // these flags control loading (submitting) and success (submitted) messages
    setSubmitted(false);
    setSubmitting(true);
    try {
      // send file to backend here using FormData object
      console.log("Deploying and retrieving IP...");
      const formData = new FormData();
      formData.append("file", file);
      formData.append("endpoint", (endpoint || "").trim());
      formData.append("contentType", "application/json");

      const uploadResponse = await uploadModel(formData); // POST to /upload by default

      // make new Docker model entry for back4app
      newParseModel(
        user,
        name,
        description,
        endpoint,
        fields,
        uploadResponse.ip,
        uploadResponse.imageName
      );

      // Reset form
      setFile(null);
      setName("");
      setDescription("");
      setEndpoint("");
      setFields([{ name: "", type: "" }]);

      if (onSubmit) onSubmit();
    } catch (err) {
      console.error("Error submitting model:", err.message);
    } finally {
      setSubmitting(false);
      setSubmitted(true);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  return (
    <div
      className="flex flex-col justify-start border border-gray-300 bg-white rounded-xl shadow-lg p-16 gap-6"
      onDragEnter={handleDrag}
    >
      <h2 className="text-2xl font-medium">Submit a Model</h2>

      <label className="text-sm font-medium">Upload .tar:</label>
      <div
        onDrop={handleDrop}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${
          dragActive ? "border-indigo-600 bg-indigo-50" : "border-gray-300"
        }
        ${file && "border-green-500 border-solid bg-green-200"}`}
      >
        {!file && (
          <>
            <p className="text-sm text-gray-500 mb-2">
              Drag & drop your file here
            </p>
            <label className="bg-indigo-100 border border-indigo-300 text-indigo-600 px-4 py-2 rounded-lg cursor-pointer w-fit hover:bg-indigo-200 inline-block">
              Choose File
              <input
                type="file"
                accept=".tar"
                onChange={(e) => setFile(e.target.files[0])}
                className="hidden"
              />
            </label>
          </>
        )}
        {file && (
          <div className="flex flex-col justify-around items-center">
            <p className="text-md text-gray-700 relative">
              <svg
                className="w-12 inline-block"
                viewBox="-8 0 32 32"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>paper</title>
                <path d="M13.52 5.72h-7.4c-0.36 0-0.56 0.2-0.6 0.24l-5.28 5.28c-0.040 0.040-0.24 0.24-0.24 0.56v12.2c0 1.24 1 2.24 2.24 2.24h11.24c1.24 0 2.24-1 2.24-2.24v-16.040c0.040-1.24-0.96-2.24-2.2-2.24zM5.28 8.56v1.8c0 0.32-0.24 0.56-0.56 0.56h-1.84l2.4-2.36zM14.080 24.040c0 0.32-0.28 0.56-0.56 0.56h-11.28c-0.32 0-0.56-0.28-0.56-0.56v-11.36h3.040c1.24 0 2.24-1 2.24-2.24v-3.040h6.52c0.32 0 0.56 0.24 0.56 0.56l0.040 16.080z"></path>
              </svg>
              {file.name}
            </p>
            <button
              className="bg-none text-sm text-red-400 hover:text-red-500 hover:cursor-pointer hover:underline"
              onClick={removeFile}
            >
              Remove file
            </button>
          </div>
        )}
      </div>

      <label className="text-sm font-medium mt-4">Model name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="My Model"
        className="p-3 border border-gray-300 rounded-lg text-sm"
      />

      <label className="text-sm font-medium mt-4">Description:</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Describe what this model does..."
        className="p-3 border border-gray-300 rounded-lg text-sm"
        rows={3}
      />

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
        {fields.map((field, i) => (
          <div key={i} className="flex gap-2 items-center relative">
            <input
              className="p-2 border border-gray-300 rounded w-1/2"
              value={field.name}
              onChange={(e) => updateField(i, "name", e.target.value)}
              placeholder="Field name"
            />
            <select
              className="p-2 border-2 border-gray-300 rounded w-1/2 focus:ring-indigo-500 focus:border-indigo-500 hover:cursor-pointer"
              value={field.type}
              onChange={(e) => updateField(i, "type", e.target.value)}
            >
              <option value="string">string</option>
              <option value="int">int</option>
              <option value="float">float</option>
              <option value="bool">bool</option>
              <option value="file">file</option>
            </select>
            {fields.length > 1 && (
              <svg
                onClick={() => removeField(i)}
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
        <button
          onClick={addField}
          className="text-blue-600 text-sm mt-1 hover:text-blue-800 hover:cursor-pointer hover:underline"
        >
          + Add input field
        </button>
      </div>

      <div className="flex mt-8 gap-4 items-center">
        <button
          onClick={submitModel}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg w-fit hover:bg-indigo-700 hover:cursor-pointer transition-all"
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>
        <ClipLoader
          color={"#4f46e5"}
          loading={submitting}
          size={20}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
      {submitted && (
        <h2 className="text-lg font-semibold text-green-600">
          Deployed successfully!
        </h2>
      )}
    </div>
  );
};

export default ModelForm;
