const API_BASE_URL = "http://localhost:5000"; // Replace with your backend URL

// Submit answers to the backend
export const submitAnswers = async (data) => {
  try {
    console.log("Sending request to backend:", data); // Log the request payload
    const response = await fetch(`${API_BASE_URL}/api/submit`, {
      // <-- FIXED HERE
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("API Error:", error); // Log the backend error
      throw new Error(error.message || "Failed to submit answers");
    }
    const result = await response.json();
    console.log("Backend response:", result); // Log the response
    return result;
  } catch (error) {
    console.error("Fetch Error:", error); // Log fetch errors
    throw error;
  }
};

// Fetch all results from the backend
export const fetchAllResults = async () => {
  try {
    console.log("Fetching all results from backend...");
    const response = await fetch(`${API_BASE_URL}/api/all-results`); // <-- FIXED HERE
    if (!response.ok) {
      const error = await response.json();
      console.error("API Error:", error); // Log the backend error
      throw new Error(error.message || "Failed to fetch results");
    }
    const results = await response.json();
    console.log("Backend response:", results); // Log the response
    return results;
  } catch (error) {
    console.error("Fetch Error:", error); // Log fetch errors
    throw error;
  }
};
