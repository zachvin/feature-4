export async function uploadModel(data, method = "POST", headers = {}) {
  const url = "http://localhost:8000/upload";
  try {
    console.log("Upload info:", data);
    const response = await fetch(url, {
      method: method,
      body: data,
    });

    if (!response.ok) {
      // handle non-2xx HTTP status codes
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error sending data to API:", error);
    throw error;
  }
}
