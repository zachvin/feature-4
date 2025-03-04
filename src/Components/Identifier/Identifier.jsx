import React, { useEffect, useState } from "react";
import { getPlantById, getAllPlants } from "../Services/plants";

// Stateful parent
const Identifier = () => {
  const [plants, setPlants] = useState([]);

  // Fetch all plant data from DB on page load
  useEffect(() => {
    getAllPlants().then((plants) => {
      console.log(plants);
      setPlants(plants);
    });
  }, []);

  return (
    <ul>
      {plants.map((plant) => (
        <div>
          <li key={plant.id}>{plant.get("name")}</li>{" "}
        </div>
      ))}
    </ul>
  );
};

export default Identifier();
