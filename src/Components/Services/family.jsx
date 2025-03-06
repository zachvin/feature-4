import Parse from "parse";

// Get a family with a specific ID
export const getFamilyById = (id) => {
  const Family = Parse.Object.extend("family");
  const query = new Parse.Query(Family);
  return query.find(id).then((result) => {
    return result;
  });
};

// Get all families regardless of ID
export const getAllFamilies = () => {
  const Family = Parse.Object.extend("family");
  const query = new Parse.Query(Family);
  return query.find().then((results) => {
    return results;
  });
};
