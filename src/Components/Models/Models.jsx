import React, { useEffect, useState } from "react";
import Nav from "../Shared/Nav";
import ModelForm from "./ModelForm";
import ModelList from "./ModelList";
// import { deleteModel } from "./ModelService";
import {
  deleteParseModel,
  getUserModels,
  deleteModel,
} from "../../Services/model";
import { readUser } from "../../Services/auth";

const Models = () => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  // get all models that the user owns, in chronological order
  const fetchModels = async () => {
    const user = readUser();
    if (!user) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const results = await getUserModels(user);
      setModels(results);
    } catch (err) {
      console.error("Error fetching models:", err.message);
    }
    setLoading(false);
  };

  // get models on page load
  useEffect(() => {
    fetchModels();
  }, []);

  // to delete a model, it has to be removed from back4app and local storage, the image must be undeployed, and the corresponding
  // service that provided the image its IP must be removed, too
  async function onDelete(event, imageName, id) {
    const data = { imageName: imageName };
    console.log("Deleting:", data);
    // deleteModel() sends a request to the backend, where the model will be removed using Google's and Kubernetes's APIs
    const response = await deleteModel(data); // POST to /delete by default. had some errors when trying to use DELETE request type.

    console.log(response);

    setModels(models.filter((item) => item.id !== id)); // remove the deleted model from local storage

    try {
      // remove deleted history from back4app
      await deleteParseModel(id);
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
