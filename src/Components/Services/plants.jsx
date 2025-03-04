import Parse from "parse";

// Get a plant with a specific ID
export const getPlantById = (id) => {
  const Plant = Parse.Object.extend("Plant");
  const query = new Parse.Query(Plant);
  return query.find(id).then((result) => {
    return result;
  });
};

// Get all plants regardless of ID
export const getAllPlants = () => {
  const Plant = Parse.Object.extend("Plant");
  const query = new Parse.query(Plant);
  return query.find().then((results) => {
    return results;
  });
};
