import React, { useState, useEffect } from "react";

const MealSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);

  const fetchMeals = async () => {
    try {
      // if (searchTerm.trim() === "") {
      //   setSearchResults([]);
      //   return;
      // }

      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setSearchResults(data.meals || []);
      setSearchTerm(""); // Clear input field after fetching data
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    // fetchMeals();

    // Cleanup function
    return () => {
      // Perform cleanup here if needed
      // For instance, aborting an ongoing fetch request using AbortController
    };
  }, [searchTerm]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        // placeholder="Search for meals..."
      />
      <button onClick={fetchMeals}>Search</button>
      {error && <p>Error: {error}</p>}
      <ul>
        {searchResults.map((meal) => (
          <li key={meal.idMeal}>{meal.strMeal}</li>
        ))}
      </ul>
    </div>
  );
};

export default MealSearch;
