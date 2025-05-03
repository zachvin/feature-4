import Parse from "parse";

export async function getModels() {
  const DockerModel = Parse.Object.extend("DockerModel");
  const query = new Parse.Query(DockerModel);
  query.descending("createdAt");
  const results = await query.find();

  return results;
}

export async function newParseModel(
  user,
  name,
  description,
  endpoint,
  fields,
  ip,
  imageName
) {
  const DockerModel = Parse.Object.extend("DockerModel");
  const model = new DockerModel();

  model.set("userID", user);
  model.set("status", "online");
  model.set("name", name.trim());
  model.set("description", description.trim());
  model.set("endpoint", endpoint.trim());
  model.set(
    "inputs",
    fields.map((f) => ({
      name: f.name.trim(),
      type: f.type.trim(),
    }))
  );

  // we save the IP and image name so we can allow user to dynamically choose which network to use
  model.set("contentType", "application/json");
  model.set("ip", ip);
  model.set("imageName", `${imageName}`);

  console.log("Saving model to database...");
  await model.save();
  console.log("Done.");
}

export async function getUserModels(user) {
  const DockerModel = Parse.Object.extend("DockerModel");
  const query = new Parse.Query(DockerModel);
  query.equalTo("userID", user);
  query.descending("createdAt");
  const results = await query.find();
  return results;
}

export async function deleteParseModel(id) {
  const ModelToDelete = Parse.Object.extend("DockerModel");
  const item = new ModelToDelete();
  item.id = id;
  await item.destroy();
}

export async function uploadModel(data, method = "POST", endpoint = "upload") {
  // node server URL
  const url = `http://localhost:8000/${endpoint}`;
  try {
    console.log("Request info:", JSON.stringify(data));
    const response = await fetch(url, {
      method: method,
      body: data,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error sending data to API:", error);
    throw error;
  }
}

export async function deleteModel(data, method = "POST", endpoint = "delete") {
  const url = `http://localhost:8000/${endpoint}`;

  // requires content type header
  try {
    const jsonData = JSON.stringify(data);
    console.log("Request info:", jsonData);
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error sending data to API:", error);
    throw error;
  }
}
