(function(window) {
  var map;
  var markers = [];
  var coffee_icon = 'http://s9.postimg.org/4t88p92dn/smallcoffee.png';
  var arrow_icon = 'http://s11.postimg.org/doml7pfhr/arrowdown.png';
  
  function convertToMiles(input_meters) {
    return (input_meters * 0.000621371).toFixed(2);
  }
  
  function convertToKilometers(input_meters) {
    return (input_meters / 1000).toFixed(2);
  }

  function initializeMap() {

    // Try using HTML5 geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var home = new google.maps.LatLng(position.coords.latitude,
          position.coords.longitude);

        var mapOptions = {
          zoom: 13,
          center: home
        };

        map = new google.maps.Map(document.getElementById('map-canvas'),
          mapOptions);

        setTimeout(function() {
          renderMap(home);
        }, 1000);
      });

    } else {
      // if location not found, default to Theranos HQ
      var home = new google.maps.LatLng(37.408248, -122.1452764);

      var mapOptions = {
        zoom: 13,
        center: home
      };

      map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

      setTimeout(function() {
        renderMap(home);
      }, 1000);
    }
  }

  // Make renderMap a global function so that the controller can access it
  window.renderMap = function renderMap(currentLocation, coffeeShops) {
    var currentInfowindow;
    
    map.setCenter(currentLocation);
    // Clear previous markers to make the function stateless
    $.each(markers, function(index, marker) {
      marker.setMap(null);
    });
    markers = [];

    var arrowMarker = new google.maps.Marker({
      position: currentLocation,
      map: map,
      icon: arrow_icon,
      animation: google.maps.Animation.DROP,
      title: "You are here!"
    });
    markers.push(arrowMarker);
    
    if(coffeeShops) {
      $.each(coffeeShops, function(index, data) {
        // make a coffee marker and place it on the map
        var marker = new google.maps.Marker({
          position: data.location,
          title: data.name,
          distance: data.distance,
          address: data.address,
          map: map,
          icon: coffee_icon,
          animation: google.maps.Animation.DROP,
        });
        
        google.maps.event.addListener(marker, 'click', function() {
          infowindowView.show(map, marker, data);
        });
  
        markers.push(marker);
        
      });
    }
  }
  
  var infowindowView = {
    displayUnit: "mi",
    googleMapsInfowindow: new google.maps.InfoWindow({title: "", maxWidth: 140}),
    show: function(map, marker, data) {
      this.googleMapsInfowindow.close();
      this.render(data);
      this.data = data;
      
      this.googleMapsInfowindow.open(map, marker);
    },
    unitSelectionListener: function() {
      if(this.displayUnit === "km"){
        this.displayUnit = "mi";
      }
      else if(this.displayUnit === "mi"){
        this.displayUnit = "km";
      }
      this.render(this.data);
      
    },
    render: function(data){
      if(this.displayUnit === "mi") {
        var convertedDistance = convertToMiles(data.distance);
        var switchedUnit = "km";
      }
      
      else if(this.displayUnit === "km") {
        var convertedDistance = convertToKilometers(data.distance);
        var switchedUnit = "mi";
      }
      var contentString = "<span style='font=Georgia'><b>" + 
                                  data.name + "</b>" + "<br>" 
                                  + convertedDistance + " " + this.displayUnit + " " + 
                                  "<a href=\"#\" class=\"selectUnit\">" 
                                  + "[" + switchedUnit +"?]"+ "</a>" + " away"
                                  + "<br> Rating: " + data.rating + " stars <p>" + 
                                  data.address + "</p></span>";

      this.googleMapsInfowindow.setContent(contentString);
    }
  }

  google.maps.event.addDomListener(window, 'load', initializeMap);
  $(document).ready(function() {
    $(document.body).on('click', '.selectUnit', function() {
      infowindowView.unitSelectionListener();
    })
  })


})(window);