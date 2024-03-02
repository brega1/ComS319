fetch("./customizations.json")
  .then(response => response.json())
  .then(customizations => loadCustomizations(customizations, "sides", "sides"));

fetch("./customizations.json")
  .then(response => response.json())
  .then(customizations => loadCustomizations(customizations, "drinks", "drinks"));