/* Fetch Customizations */

fetch("./data.json")
  .then(response => response.json())
  .then(customizations => loadCustomizations(customizations, "sides", "sides"));

fetch("./data.json")
  .then(response => response.json())
  .then(customizations => loadCustomizations(customizations, "drinks", "drinks"));
