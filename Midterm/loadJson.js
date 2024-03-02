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
    <a href="choose-meal.html#${id}">
      <button class="cardinal-bg">Order</button>
    </a>
      `;
    list.appendChild(li);
  }
}