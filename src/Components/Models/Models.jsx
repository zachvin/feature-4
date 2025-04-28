import React, { useEffect, useState } from "react";
import Parse from "parse";
import Nav from "../Shared/Nav";
import ModelForm from "./ModelForm";
import ModelList from "./ModelList";
import { deleteModel } from "./ModelService";

const Models = () => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchModels = async () => {
    const user = Parse.User.current();
    if (!user) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const DockerModel = Parse.Object.extend("DockerModel");
      const query = new Parse.Query(DockerModel);
      query.equalTo("userID", user);
      query.descending("createdAt");
      const results = await query.find();
      setModels(results);
    } catch (err) {
      console.error("Error fetching models:", err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchModels();
  }, []);

  async function onDelete(event, imageName, id) {
    const data = { imageName: imageName };
    console.log("Deleting:", data);
    const response = await deleteModel(data); // POST to /delete by default (can't use DELETE request?)

    console.log(response);

    setModels(models.filter((item) => item.id !== id)); // Remove the deleted model from local storage
    console.log(models.length);

    try {
      // Remove deleted history from database
      const ModelToDelete = Parse.Object.extend("DockerModel");
      const item = new ModelToDelete();
      item.id = id;
      await item.destroy();
    } catch (err) {
      console.error("Bad delete in component:", err);
    }
  }

  return (
    <>
      <Nav />
      <section className="grid grid-cols-1 gap-2 w-3/4 h-3/4 mx-auto mt-32 text-gray-900 mb-8">
        <ModelForm onSubmit={fetchModels} />
        <ModelList models={models} loading={loading} onDelete={onDelete} />
      </section>
    </>
  );
};

export default Models;
