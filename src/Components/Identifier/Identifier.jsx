import React, { useEffect, useState } from "react";
import { getPlantById, getAllPlants } from "../Services/plants";
import { getFamilyById, getAllFamilies } from "../Services/family";
import IdentifierItem from "./IdentifierItem";

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
          <IdentifierItem key={plant.id} name={plant.get("name")} scientific={plant.get("scientific")} />
        ))}
      </div>
    </section>
  );
};

export default Identifier;
