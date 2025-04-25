export async function sendInput(url, data, method = "POST", headers = {}) {
  console.log(url);
  try {
    console.log(data);
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json", // Default to JSON, can be overridden
        "Access-Control-Allow-Origin": "*",
        ...headers, // Merge user-provided headers
      },
      body: JSON.stringify(data), // Convert data to JSON string
    });

    if (!response.ok) {
      // Handle non-2xx HTTP status codes
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Attempt to parse the response as JSON. If it's not JSON, it will throw an error,
    // which is caught in the outer try-catch.
    const responseData = await response.json();
    return responseData.prediction; // Return the parsed JSON data
  } catch (error) {
    console.error("Error sending data to API:", error);
    // You might want to re-throw the error, or return a specific error object,
    // depending on how you want to handle errors in the calling code.
    throw error; // Propagate the error.
  }
}
