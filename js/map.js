 // Function to draw your map
var drawMap = function() {
  // Create map and set viewd
  // Create an tile layer variable using the appropriate url
  // Add the layer to your map
  // Execute your function to get data

  var map = L.map('container');
  map.setView([47.61, -122.33], 12);

  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);
  alert('before getData');
  getData();
}

// Function for getting data
var getData = function() {

  // Execute an AJAX request to get the data in data/response.js
  // When your request is successful, call your customBuild function
  var data;
  alert('declared data');
  $.ajax({
  	url:'data/response.json',
  	type:'get',
  	success: function(d) {
  		data = d;
  		alert('got data');
  		customBuild(data);	
  		alert('reached here');
  	},
  	dataType:'json'
  });
}

// Do something creative with the data here!  
var customBuild = function(data) {
	alert('reached customBuild');
	data.map(function(d) {
		alert('add circle');
		var circle = L.circle([d.lat, d.lng], 200, {color: 'red', opacity: 0.5});
    circle.addTo(map);
		alert('add circle 2');

	});
	alert('added ticker');
}


