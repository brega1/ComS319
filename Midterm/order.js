/* Needs both JSONs in one function */
fetch("./customizations.json")
  .then(response => response.json())
  .then(customizations => 
    fetch("./meals.json")
    .then(response => response.json())
    .then(meals => loadOrder(meals, customizations)));