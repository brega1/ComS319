fetch("./restaurants.json")
  .then(response => response.json())
  .then(restaurants => loadRestaurants(restaurants, "locations"));