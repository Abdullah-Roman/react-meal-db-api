import React, { useEffect, useState } from "react";

const Meal = () => {
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const [searchTerm, setSearchTerm] = useState("rice");

  const loadApi = async (searchTerm) => {
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
      );
      if (!res.ok) {
        throw new Error("Network error is");
      }
      const data = await res.json();
      console.log(data);
      setData(data.meals);
      setSearchTerm("");
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    loadApi(searchTerm);
  }, []);

  const eventHandler = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    <>
      {error && <p>{error}</p>}
      <h1 className="heading">Search Your Favourite Meal Here</h1>

      <div className="field">
        <input
          type="text"
          value={searchTerm}
          onChange={eventHandler}
          placeholder="search your meal keyword like chicken"
        />
        <button onClick={() => loadApi(searchTerm)} className="btn">
          Search
        </button>
      </div>
      <div className="main">
        {data.map((meal) => {
          return (
            <div key={meal.idMeal} className="card">
              <img src={meal.strMealThumb} alt="" />
              <h3>{meal.strMeal}</h3>
              <p>{meal.strInstructions}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Meal;
