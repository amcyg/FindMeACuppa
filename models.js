(function(window) {
  var coffeeShops = [];

  $.getJSON("locations.json", function(jsonObj) {
    $.each(jsonObj.results, function(index, value) {
      // parse lat-long data to fit required format
      var parts = value.latlong.split(',');
      var lat = parseFloat(parts[0]);
      var long = parseFloat(parts[1]);
      coffeeShops.push({
        name: value.name,
        location: new google.maps.LatLng(lat, long),
        address: value.address,
        rating: value['rating:'] || value['rating']
      });
    });
  });

  // Exposing this function globally for future distance calculations
  window.nearbyCoffeeShops = function(currentLocation) {
    var coffeeShopsWithDistances = [];

    $.each(coffeeShops, function(index, coffeeShop) {
      // Calculate distance in meters
      var distance = google.maps.geometry.spherical.computeDistanceBetween(currentLocation, coffeeShop.location);
      var coffeeShopWithDistance = [distance, coffeeShop];
      coffeeShopsWithDistances.push({
        name: coffeeShop.name,
        address: coffeeShop.address,
        rating: coffeeShop.rating,
        location: coffeeShop.location,
        distance: distance
        });
    });

    coffeeShopsWithDistances.sort(function(a, b) {
      return a.distance - b.distance;
    });
    
    var results = [];
    
    $.each(coffeeShopsWithDistances, function(index, coffeeShopWithDistance) {
      if (index < 5) {
        results.push(coffeeShopWithDistance);
      }
    })
    
    return results;
  }

})(window);