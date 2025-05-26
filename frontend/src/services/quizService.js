const API_BASE_URL = process.env.REACT_APP_API_URL; 

// Submit ansers // backend
// Fetching all from the backend

export const submitAnswers = async (data) => {
  try {
    console.log("Sending request to backend:", data); 
    const response = await fetch(`${API_BASE_URL}/api/submit`, {
      
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("API Error:", error);
      throw new Error(error.message || "Failed to submit answers");
    }
    const result = await response.json();
    console.log("Backend response:", result); 
    return result;
  } catch (error) {
    console.error("Fetch Error:", error); 
    throw error;
  }
};


export const fetchAllResults = async () => {
  try {
    console.log("Fetching all results from backend...");
    const response = await fetch(`${API_BASE_URL}/api/all-results`); 
    if (!response.ok) {
      const error = await response.json();
      console.error("API Error:", error); // 
      throw new Error(error.message || "Failed to fetch results");
    }
    const results = await response.json();
    console.log("Backend response:", results); 
    return results;
  } catch (error) {
    console.error("Fetch Error:", error); 
    throw error;
  }
};
