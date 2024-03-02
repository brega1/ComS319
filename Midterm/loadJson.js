function loadRestaurants(data, ulId) {
  var list = document.getElementById(ulId);

  for (var i = 0; i < data.restaurants.length; i++){
    let name = data.restaurants[i].name;
    let building = data.restaurants[i].building;
    let hours = data.restaurants[i].hours;
    let id = data.restaurants[i].hours;
    let li = document.createElement("li");
    li.innerHTML = `
    <div class=info>
      <strong>${name}</strong>${building} ${hours}
    </div>
    <a href="choose-meal.html?location=${id}">
      <button class="cardinal-bg">Order</button>
    </a>
      `;
    list.appendChild(li);
  }
}

function loadMeals(data, ulId, restaurantId) {
  var list = document.getElementById(ulId);

  for (var i = 0; i < data.meals.length; i++){
    let locationId = data.meals[i].locationId;

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
  // const params = new URLSearchParams(window.location.search);
  var list = document.getElementById(ulId);

  if (type == "sides")
    var selectedData = data.sides;
  else
    var selectedData = data.drinks;

  for (var i = 0; i < selectedData.length; i++){
    let name = selectedData[i].name;
    // let price = (Math.round(selectedData[i].price * 100) / 100).toFixed(2);
    let image = selectedData[i].image;
    let id = selectedData[i].id;
    let li = document.createElement("li");
    li.innerHTML = `
      <img src="icons/${image}" alt="${name}">
      <div class=info>
        <strong>${name}</strong>
      </div>
      <input type="checkbox" id="${id}" name="${name}" />
      `;
    list.appendChild(li);
  }
}