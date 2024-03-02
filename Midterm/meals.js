const searchParams = new URLSearchParams(window.location.search);

fetch("./meals.json")
  .then(response => response.json())
  .then(meals => loadMeals(meals, "meals", searchParams.size > 0 ? searchParams.get("location") : null));