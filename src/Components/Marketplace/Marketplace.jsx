import React, { useEffect, useState } from "react";
import Parse from "parse";
import Nav from "../Shared/Nav";
import MarketplaceCard from "./MarketplaceCard";

const Marketplace = () => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchModels = async () => {
    setLoading(true);
    try {
      const DockerModel = Parse.Object.extend("DockerModel");
      const query = new Parse.Query(DockerModel);
      query.descending("createdAt");
      const results = await query.find();
      setModels(results);
    } catch (err) {
      console.error("Error fetching marketplace models:", err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchModels();
  }, []);

  return (
    <>
      <Nav />
      <section className="w-11/12 mx-auto mt-36 text-gray-900">
        {loading ? (
          <p className="text-center">Loading models...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {models.map((model) => (
              <MarketplaceCard key={model.id} model={model} />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Marketplace;
