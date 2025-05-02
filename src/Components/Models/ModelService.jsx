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
