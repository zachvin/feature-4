export async function sendInput(url, data, method = "POST", headers = {}) {
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        ...headers,
      },
      body: JSON.stringify(data), // convert data to JSON string
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData.prediction; // return the parsed JSON data
  } catch (error) {
    console.error("Error sending data to API:", error);
    throw error;
  }
}
