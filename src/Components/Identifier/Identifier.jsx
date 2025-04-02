import React, { useEffect, useState } from "react";
import { getPlantById, getAllPlants } from "../Services/plant";
import { getFamilyById, getAllFamilies } from "../Services/family";
import IdentifierItem from "./IdentifierItem";
import Nav from "../Shared/Nav";

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

  // send plant data and family name to IdentifierItem
  return (
    <section className="identifier">
      <Nav />
      <h1>Identify your plants here with the Plant Identifier!</h1>
      <div className="plants">
        {plants.map((plant) => {
          const family = families.find((f) => f.id === plant.get("family").id);
          return (
            <IdentifierItem
              key={plant.id}
              name={plant.get("name")}
              scientific={plant.get("scientific")}
              family={family ? family.get("name") : "Loading..."}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Identifier;
