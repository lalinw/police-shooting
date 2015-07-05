 // Function to draw your map
var drawMap() = function() {

  // Create map and set viewd
	 

  // Create an tile layer variable using the appropriate url

  // Add the layer to your map
 

  // Execute your function to get data

  var map = L.map('map-container');
  map.SetView([lat, longi], 12);

  L.tileLayer('http://{s}.url/{z}/{x}/{y}.png').addTo(map);

  getData();
}

// Function for getting data
var getData = function() {

  // Execute an AJAX request to get the data in data/response.js


  // When your request is successful, call your customBuild function
  var data;
  $.ajax({
  	url:'https://data.seattle.gov/resource/7ais-f98f.json',
  	type: 'get',
  	success:function(d) {
  		data = d;

  		customBuild();
  	},
  	dataType: 'json'
  });
}

// Do something creative with the data here!  
var customBuild = function() {
	data.map(function(d) {
		var circle = new L.circle([d.latitude, d.longitude], 200, {
			color:'red',
			opacity: 0.5
		}).addTo(map);
	});

}


