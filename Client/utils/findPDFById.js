const fetchData = async (userId) => {
  try {
    // Make a GET request with the user ID as a parameter
    const response = await axios.get(
      `http://your-api-url/data?userId=${userId}`
    );

    if (response.status === 200) {
      // Data was fetched successfully
      console.log("Data:", response.data);
    } else {
      // Handle unexpected response status
      console.log("Unexpected response:", response.status);
    }
  } catch (error) {
    // Handle any errors that occurred during the request
    console.error("Error:", error.message);
  }
};

export default fetchData;
