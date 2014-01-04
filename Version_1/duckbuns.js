// CALENDAR FUNCTIONALITIES

var _event = [];
var map;
var start;
var end;
var waypts = [];
var waypt_i = 1;
var markers = [];

$(document).ready(function() {
		
		var date = new Date();
		var d = date.getDate();
		var m = date.getMonth();
		var y = date.getFullYear();
		
		$('#calendar').fullCalendar({
		
		header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,agendaWeek,agendaDay'
			},
			
		firstDay: 1,
		
		weekMode: 'variable',
		
		aspectRatio: 1.35,
		
		events: _event
		
		});
		
});

function initialize_Cal() {
	
	$('#calendar').fullCalendar( 'removeEvents');
	
}
    

function updateCal() {
	
		initialize_Cal();
		
		var waypt_location = document.getElementById('target');
		var waypt_date = document.getElementById('startdate');
		var waypt_time = document.getElementById('starttime');
		var waypt_time_f = document.getElementById('starttime_f');				
		if(waypt_location.value && waypt_date.value) {
			var myLocation = waypt_location.value;
			var myDate = new Date (waypt_date.value);
			var myTime = waypt_time.value;
			var myTime_f = waypt_time_f.value;
			addCal(myLocation,myDate,myTime,myTime_f);
		}
		else {
			alert("Cannot add starting point to calendar: some information is missing!"); 
		};
		
		if (waypt_i <= 1) {} else{
			for (var i = 1; i < waypt_i; i++) {
				var waypt_location = document.getElementById('waypt'+i);
				var waypt_date = document.getElementById('waypt'+i+'date');
				var waypt_time = document.getElementById('waypt'+i+'time');
				var waypt_time_f = document.getElementById('waypt'+i+'time_f');				
				if(waypt_location.value && waypt_date.value) {
					var myLocation = waypt_location.value;
					var myDate = new Date (waypt_date.value);
					var myTime = waypt_time.value;
					var myTime_f = waypt_time_f.value;
					addCal(myLocation,myDate,myTime,myTime_f);
				}
				else {
					alert("Cannot add waypoint "+i+" to calendar: some information is missing!"); 
				}
				
			}
			
		};
		
		var waypt_location = document.getElementById('target2');
		var waypt_date = document.getElementById('enddate');
		var waypt_time = document.getElementById('endtime');
		var waypt_time_f = document.getElementById('endtime_f');						
		if(waypt_location.value)
		{
			if(waypt_location.value && waypt_date.value) {
				var myLocation = waypt_location.value;
				var myDate = new Date (waypt_date.value);
				var myTime = waypt_time.value;
				var myTime_f = waypt_time_f.value;
				addCal(myLocation,myDate,myTime,myTime_f);
			}
			else {
				alert("Cannot add ending point to calendar: some information is missing!"); 
			}
		}
		else {
		};
		
}

//new Date(year, month, day, hours, minutes, seconds, milliseconds)

function addCal(myLocation,myDate,myTime,myTime_f) {
		
		if (!myTime){
			var Year = myDate.getYear()+1900;
			var Month = myDate.getMonth();
			var Day = myDate.getDate();
			var date_i = new Date(Year, Month, Day);
			var event =
			{
				title: myLocation,
				start: date_i
		       	}
		       	;
		       	
		}
		else{
	
		if (!myTime_f){
			var Year = myDate.getYear()+1900;
			var Month = myDate.getMonth();
			var Day = myDate.getDate();
			var Hour_i_string = myTime[0] + myTime[1];
			var Hour_i_num = parseInt(Hour_i_string);			
			var Min_i_string = myTime[3] + myTime[4];
			var Min_i_num = parseInt(Min_i_string);			
			var date_i = new Date(Year, Month, Day, Hour_i_num, Min_i_num);
			var event =
			{
				title: myLocation,
				start: date_i,
				end: date_i,
				allDay: false
		       	}
		       	;
		       	
		}
			
		else{
			var Year = myDate.getYear()+1900;
			var Month = myDate.getMonth();
			var Day = myDate.getDate();
			var Hour_i_string = myTime[0] + myTime[1];
			var Hour_i_num = parseInt(Hour_i_string);			
			var Min_i_string = myTime[3] + myTime[4];
			var Min_i_num = parseInt(Min_i_string);			
			var date_i = new Date(Year, Month, Day, Hour_i_num, Min_i_num);
			var Hour_f_string = myTime_f[0] + myTime_f[1];
			var Hour_f_num = parseInt(Hour_f_string);			
			var Min_f_string = myTime_f[3] + myTime_f[4];
			var Min_f_num = parseInt(Min_f_string);			
			var date_f = new Date(Year, Month, Day, Hour_f_num, Min_f_num);
			var event =
			{
				title: myLocation,
				start: date_i,
				end: date_f,
				allDay: false
		       	}
		       	;
		       	
		};
		
		};
		
       	$('#calendar').fullCalendar('renderEvent', event, true);
			
}

// MAP FUNCTIONALITIES

var directionsService = new google.maps.DirectionsService();
var directionsDisplay = new google.maps.DirectionsRenderer();

function initialize() {


  map = new google.maps.Map(document.getElementById('map-canvas'), {
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });
    
  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById("directions-panel"));


  var defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(-33.8902, 151.1759),
      new google.maps.LatLng(-33.8474, 151.2631));
  map.fitBounds(defaultBounds);

  // Create the search box and link it to the UI element.
  var input = document.getElementById('target');
  var searchBox = new google.maps.places.SearchBox(input);

  var input2 = document.getElementById('target2');
  var searchBox2 = new google.maps.places.SearchBox(input2);
  
  // Listen for the event fired when the user selects an item from the
  // pick list. Retrieve the matching places for that item.
  google.maps.event.addListener(searchBox, 'places_changed', function() {
    var places = searchBox.getPlaces();

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

    start = places[0].geometry.location;
    
    map.fitBounds(bounds);
  });
  
  // Bias the SearchBox results towards places that are within the bounds of the
  // current map's viewport.
  google.maps.event.addListener(map, 'bounds_changed', function() {
    var bounds = map.getBounds();
    searchBox2.setBounds(bounds);
  });
  
  // Listen for the event fired when the user selects an item from the
  // pick list. Retrieve the matching places for that item.
  google.maps.event.addListener(searchBox2, 'places_changed', function() {
    var places = searchBox2.getPlaces();

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
    
    end = places[0].geometry.location;

    map.fitBounds(bounds);
  });
  
  
}

//Function to add a waypoint

function addwaypt() {
	
  document.getElementById('waypt'+waypt_i+'span').innertext="</br>";
  document.getElementById('waypt'+waypt_i+'span').className='show';
  
  var input = document.getElementById('waypt'+waypt_i);
  var searchBox = new google.maps.places.SearchBox(input);
  
  // Listen for the event fired when the user selects an item from the
  // pick list. Retrieve the matching places for that item.
  google.maps.event.addListener(searchBox, 'places_changed', function() {
    var places = searchBox.getPlaces();

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

    waypt = places[0].geometry.location;
    waypts.push({
          location:waypt,
          stopover:true});
    
    map.fitBounds(bounds);
  });
  
  waypt_i++;

}

//Function to hide waypoint

function dltwaypt() {
	
  if(waypt_i==1) {} else {
  waypt_i--;
  document.getElementById('waypt'+waypt_i+'span').innertext="";
  document.getElementById('waypt'+waypt_i+'span').className='hide';
  document.getElementById('waypt'+waypt_i).value='';
  waypts.pop();
  getD();
  }
}
  
//Function to get route
  
function getD() {

  var request = {
      origin: start,
      destination: end,
      waypoints: waypts,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
      var route = response.routes[0];
      var summaryPanel = document.getElementById('directions_panel');
      summaryPanel.innerHTML = '';
      // For each route, display summary information.
      for (var i = 0; i < route.legs.length; i++) {
        var routeSegment = i + 1;
        summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment + '</b><br>';
        summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
        summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
        summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
      }
    }
  });
}

google.maps.event.addDomListener(window, 'load', initialize);

