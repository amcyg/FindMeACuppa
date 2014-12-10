(function(window) {
  var geocoder = new google.maps.Geocoder();

  function updateSearch(event) {
    event.preventDefault();

    var locationText = $("[name=location]").val();

    // geocode the location to get a LatLng object
    geocoder.geocode({
      'address': locationText
    }, function(results, status) {
      if (status == "OK") {
        var currentLocation = results[0].geometry.location;
        // This is our call to the model
        var coffeeShops = window.nearbyCoffeeShops(currentLocation);
        renderMap(currentLocation, coffeeShops);
      } else if (status == "ZERO_RESULTS") {
        // do nothing if search item can't be found in Google Maps API
      } else {
        // shwaaaaaa?
        throw new Exception(status);
      }
    });
  }

  $(document).ready(function() {
    // register UI event handlers
    $("#search form").on('submit', updateSearch);
  });

})(window);