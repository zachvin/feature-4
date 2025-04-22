import React, { useEffect, useState } from "react";
import Parse from "parse";
import Nav from "../Shared/Nav";
import ModelForm from "./ModelForm";
import ModelList from "./ModelList";

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
      query.equalTo("userId", user);
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

  return (
    <>
      <Nav />
      <section className="grid grid-cols-1 gap-2 w-3/4 h-3/4 mx-auto mt-64 text-gray-900">
        <ModelForm onSubmit={fetchModels} />
        <ModelList models={models} loading={loading} />
      </section>
    </>
  );
};

export default Models;
