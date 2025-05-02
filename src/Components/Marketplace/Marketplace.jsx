import React, { useEffect, useState } from "react";
import { getModels } from "../../Services/model";
import Nav from "../Shared/Nav";
import MarketplaceCard from "./MarketplaceCard";
import { useNavigate } from "react-router-dom";

const Marketplace = () => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  // get model details from back4app
  const fetchModels = async () => {
    setLoading(true);
    try {
      const results = await getModels();
      setModels(results);
    } catch (err) {
      console.error("Error fetching marketplace models:", err.message);
    }
    setLoading(false);
  };

  // fetch models on page load
  useEffect(() => {
    fetchModels();
  }, []);

  // move to dashboard when user clicks "test" on model card
  const navigate = useNavigate();
  const handleTest = () => {
    navigate("/dashboard");
  };

  return (
    <>
      <Nav />
      <section className="w-11/12 mx-auto mt-36 text-gray-900">
        <h1 className="text-6xl">Browse models</h1>
        {loading ? (
          <p className="text-center mt-8">Loading models...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {models.map((model) => (
              <MarketplaceCard
                key={model.id}
                model={model}
                handleTest={handleTest}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Marketplace;
