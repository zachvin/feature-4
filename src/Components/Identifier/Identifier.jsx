import React, { useEffect, useState } from "react";
import { getPlantById, getAllPlants } from "../Services/plants";
import { getFamilyById, getAllFamilies } from "../Services/family";

// Stateful parent
const Identifier = () => {
  const [plants, setPlants] = useState([]);
  const [families, setFamilies] = useState([]);

  // Fetch all plant and family data from DB on page load
  useEffect(() => {
    getAllPlants().then((plants) => {
      console.log(plants);
      setPlants(plants);
    });

    getAllFamilies().then((families) => {
      console.log(families);
      setFamilies(families);
    });
  }, []);

  return (
    <section className="identifier">
      <h1>Identify your plants here with the Plant Identifier!</h1>
      <div className="plants">
        {plants.map((plant) => (
          <div className="plant">
            <h3>{plant.get("name")}</h3>
            <h4>{plant.get("scientific")}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Identifier;
