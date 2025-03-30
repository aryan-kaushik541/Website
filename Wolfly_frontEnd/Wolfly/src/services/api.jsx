const API_BASE_URL = 'http://localhost:8000/api/register/'; // Replace with your backend API URL

const headers = {
  'Content-Type': 'application/json',
  // Add any other headers you need, e.g., Authorization for tokens
};

const api = {
  post: async (endpoint, data) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return await response.json();
    } catch (error) {
      console.error('Error during API call:', error);
      throw error;
    }
  },
};

export default api;