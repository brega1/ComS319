/* Needs both JSONs in one function */
fetch("./data.json")
  .then(response => response.json())
  .then(customizations => 
    fetch("./data.json")
    .then(response => response.json())
    .then(meals => loadOrder(meals, customizations)));