fetch("./customizations.json")
  .then(response => response.json())
  .then(customizations => loadCustomizations(customizations, "customizations", "drinks"));