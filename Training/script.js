function initialize() {

  var markers = [];
  var map = new google.maps.Map(document.getElementById('map-canvas'), {
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(-33.8902, 151.1759),
      new google.maps.LatLng(-33.8474, 151.2631));
  map.fitBounds(defaultBounds);

  // Create the search box and link it to the UI element.
  var input_1 = document.getElementById('target_1');
  var searchBox_1 = new google.maps.places.SearchBox(input_1);
    
  // Listen for the event fired when the user selects an item from the
  // pick list. Retrieve the matching places for that item.
  google.maps.event.addListener(searchBox_1, 'places_changed', function() {
    var places = searchBox_1.getPlaces();

    for (var i = 0, marker; marker = markers[i]; i++) {
      marker.setMap(null);
    }

    // For each place, get the icon, place name, and location.
    markers = [];
    var bounds = new google.maps.LatLngBounds();
    
    for (var i = 0, place; place = places[i]; i++) {
      var image = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      var marker = new google.maps.Marker({
        map: map,
        icon: image,
        title: place.name,
        position: place.geometry.location
      });

      markers.push(marker);

      bounds.extend(place.geometry.location);
    }

    map.fitBounds(bounds);
  });

  // Bias the SearchBox results towards places that are within the bounds of the
  // current map's viewport.
  google.maps.event.addListener(map, 'bounds_changed', function() {
    var bounds = map.getBounds();
    searchBox_1.setBounds(bounds);
    searchBox_2.setBounds(bounds);
  });
}

function getDirection(){
	
  // Initialize variables.
  var directionsDisplay;
  var directionsService = new google.maps.DirectionsService();
  var map;

  // Create the search boxes and link it to the UI element.
  var input_1 = document.getElementById('target_1');
  var searchBox_1 = new google.maps.places.SearchBox(input_1);
  
  var input_2 = document.getElementById('target_2');
  var searchBox_2 = new google.maps.places.SearchBox(input_2);

  // Get the start and end locations.
  var start_list = searchBox_1.getPlaces();
  var start_0 = start_list[0];
  alert(start_0);
  var start = start_0.geometry.location;
  
  
  var end_list = searchBox_2.getPlaces();
  var end_0 = end_list[0];
  var end = end_0.geometry.location;

  // Initialize map.
  directionsDisplay = new google.maps.DirectionsRenderer();
  map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
  directionsDisplay.setMap(map);
  
  var request = {
    origin:start,
    destination:end,
    travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, function(result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(result);
    }
  });
  
}

google.maps.event.addDomListener(window, 'load', initialize);
