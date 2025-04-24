export async function uploadModel(data, method = "POST", headers = {}) {
  const url = "http://localhost:8000/upload";
  try {
    console.log("Upload info:", data);
    const response = await fetch(url, {
      method: method,
      body: data,
    });

    if (!response.ok) {
      // Handle non-2xx HTTP status codes
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Attempt to parse the response as JSON. If it's not JSON, it will throw an error,
    // which is caught in the outer try-catch.
    const responseData = await response.json();
    return responseData; // Return the parsed JSON data
  } catch (error) {
    console.error("Error sending data to API:", error);
    // You might want to re-throw the error, or return a specific error object,
    // depending on how you want to handle errors in the calling code.
    throw error; // Propagate the error.
  }
}
