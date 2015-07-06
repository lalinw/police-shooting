 // Function to draw your map
var drawMap = function() {
  // Create map and set viewd
  // Create an tile layer variable using the appropriate url
  // Add the layer to your map
  // Execute your function to get data
  var theMap = L.map('container').setView([38.5, -98.0], 4);
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(theMap);
  getData(theMap);
}

// Function for getting data
var getData = function(theMap) {

  // Execute an AJAX request to get the data in data/response.js
  // When your request is successful, call your customBuild function
  var data;
  $.ajax({
  	url:'data/response.json',
  	type:'get',
    async: false,
  	success: function(dem) {data = dem;},
  	dataType:'json'
  });
  customBuild(theMap, data);  
}


// Do something creative with the data here!  
var customBuild = function(theMap, data) {
		data.map(function(dis) {
    var cirMa = L.circleMarker([dis.lat, dis.lng],
      {radius: 5, 
      color: 'red', 
      opacity: 0.7, 
      stroke: false
    }).addTo(theMap);
  });

}


