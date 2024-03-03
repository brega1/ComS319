function loadRestaurants(data, ulId) {
  var list = document.getElementById(ulId);

  for (var i = 0; i < data.restaurants.length; i++) {
    let name = data.restaurants[i].name;
    let building = data.restaurants[i].building;
    let hours = data.restaurants[i].hours;
    let id = data.restaurants[i].id;
    let li = document.createElement("li");
    li.innerHTML = `
    <div class=info>
      <strong>${name}</strong>${building} ${hours}
    </div>
    <a href="meals.html?location=${id}">
      <button class="cardinal-bg">Order</button>
    </a>
      `;
    list.appendChild(li);
  }
}

function loadMeals(data, ulId, restaurantId) {
  /* Handle Loading Data */
  var list = document.getElementById(ulId);

  for (var i = 0; i < data.meals.length; i++) {
    let locationId = data.meals[i].locationId;

    /* Math against or ignore the restaurant filter argument */
    if (Object.is(restaurantId, null) || locationId == restaurantId) {
      // let price = (Math.round(selectedData[i].price * 100) / 100).toFixed(2);
      let name = data.meals[i].name;
      let image = data.meals[i].image;
      let price = (Math.round(data.meals[i].price * 100) / 100).toFixed(2);
      let calories = data.meals[i].calories;
      let id = data.meals[i].id;
      let li = document.createElement("li");
      li.innerHTML = `
        <img src="images/${image}" alt="${name}">
        <div class=info>
          <strong>${name}</strong><br>Calories: ${calories}<br>$${price}
        </div>
        <a href="customize.html?meal=${id}">
          <button class="cardinal-bg">Choose</button>
        </a>
      `;
      list.appendChild(li);
    }
  }
}

/**
 * @param restaurantId can be set to null to not filter for any one restaurant
 */
function loadMealsVertical(data, ulId, restaurantId) {
  var list = document.getElementById(ulId);

  for (var i = 0; i < data.meals.length; i++) {
    let locationId = data.meals[i].locationId;

    /* Math against or ignore the restaurant filter argument */
    if (Object.is(restaurantId, null) || locationId == restaurantId) {
      let name = data.meals[i].name;
      let price = (Math.round(data.meals[i].price * 100) / 100).toFixed(2);
      let id = data.meals[i].id;
      let li = document.createElement("li");
      li.innerHTML = `
      <div class=info>
        <strong>${name}</strong>${price}
      </div>
      <a href="customize.html?meal=${id}">
        <button class="cardinal-bg">Choose</button>
      </a>
        `;
      list.appendChild(li);
    }
  }
}

function loadCustomizations(data, ulId, type) {
  /* Handle Loading Data */
  var list = document.getElementById(ulId);

  if (type == "sides")
    var selectedData = data.sides;
  else
    var selectedData = data.drinks;

  for (var i = 0; i < selectedData.length; i++) {
    let name = selectedData[i].name;
    // let price = (Math.round(selectedData[i].price * 100) / 100).toFixed(2);
    let image = selectedData[i].image;
    let price = (Math.round(selectedData[i].price * 100) / 100).toFixed(2);
    let calories = selectedData[i].calories;
    let id = selectedData[i].id;
    let li = document.createElement("li");
    li.innerHTML = `
      <img src="images/${image}" alt="${name}">
      <div class=info>
        <strong>${name}</strong><br>Calories: ${calories}<br>$${price}
      </div>
      <input type="checkbox" id="${id}" name="${name}" />
      `;
    list.appendChild(li);
  }

  /* Edit continue button */
  const searchParams = new URLSearchParams(window.location.search);
  var buttonArea = document.getElementById("endOrder");

  buttonArea.innerHTML = `
    <a href="order.html?meal=${searchParams.get("meal")}">
      <button class="majorButton">Continue</button>
    </a>
  `;

  /* Add event listeners to update localStorage for all checkboxes.
     The idea is that, if whatever is currently checked changes, update localStorage accordingly. */
  localStorage.setItem("customizations", "");
  options = document.querySelectorAll('input');

  var selected = [];
  options.forEach((option) => {
    option.addEventListener('click', (event) => {
      /* Determine what is selected and store it */
      selected = [];
      options.forEach((option) => {
        if (option.checked == true) {
          selected.push(option.id);
        }
      });

      /* Convert selected data into a string with split with spaces and then store */
      var strOut = "";
      selected.forEach((option) => {
        strOut = strOut.concat(option, " ");
      });
      localStorage.setItem("customizations", strOut);
    })
  });
}

/* Take in JSON files to use as a reference for localStorage and URL params
   to generate a final list of names and prices (and a total) for the order. */
function loadOrder(mealData, customData) {
  /* Store/parse data into something easy to read */
  const searchParams = new URLSearchParams(window.location.search);
  var customizations = localStorage.getItem("customizations").split(' ');

  /* Find the meal using the meal id in the JSON file */
  for (let i = 0; i < mealData.meals.length; i++) {
    if (searchParams.get("meal") == mealData.meals[i].id)
      var meal = mealData.meals[i];
  }

  /* Find each side and drink in customization JSON */
  var customObjects = [];
  for (let i = 0; i < customizations.length; i++) {
    for (let j = 0; j < customData.sides.length; j++) {
      if (customizations[i] == customData.sides[j].id) {
        customObjects.push(customData.sides[j]);
      }
    }
    for (let j = 0; j < customData.drinks.length; j++) {
      if (customizations[i] == customData.drinks[j].id) {
        customObjects.push(customData.drinks[j]);
      }
    }
  }

  /* Add the meal's name and price to the order summary list */
  var list = document.getElementById("summary");
  let li = document.createElement("li");
  var total = meal.price;
  let price = (Math.round(meal.price * 100) / 100).toFixed(2);
  li.innerHTML = `<strong>${meal.name}</strong>: $${price}`;
  list.appendChild(li);

  /* Add each customization to the order summary list */
  for (let i = 0; i < customObjects.length; i++) {
    let li = document.createElement("li");
    total += customObjects[i].price;
    let price = (Math.round(customObjects[i].price * 100) / 100).toFixed(2);
    li.innerHTML = `<strong>${customObjects[i].name}</strong>: $${price}`;
    list.appendChild(li);
  }

  /* Show the total price at the below the summary (h2#total) */
  var totalLabel = document.getElementById("total");
  totalLabel.innerHTML = `Total: $${(Math.round(total * 100) / 100).toFixed(2)}`;
}