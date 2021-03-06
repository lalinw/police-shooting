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
  	success: function(dem) {
      data = dem;
      customBuild(theMap, data);
    },
  	dataType:'json'
  });
    
}


// Do something creative with the data here!  
var customBuild = function(theMap, data) {
  var femaleVic = L.layerGroup().addTo(theMap);
  var maleVic = L.layerGroup().addTo(theMap);
  var unknownGen = L.layerGroup().addTo(theMap);
	
  var overlayMaps = {
    "Female Victims": femaleVic,
    "Male Victims": maleVic,
    "Unspecified Victims": unknownGen
  };

  L.control.layers(null, overlayMaps).addTo(theMap);

  data.map(function(dis) {
    var clr = 'blue';
    if (dis['Hit or Killed?'] == 'Hit') {
      clr = 'blue';
    } else { //Killed is red
      clr = 'red';
    }

    var text = "<b>Location:</b> " + dis.City + ", " + dis.State.substring(0,2) + "<br/>" +
      "<b>Date:</b> " + dis.Timestamp + "<br/>" +
      "<b>Victim:</b> " + dis.Race + " " + dis["Victim's Gender"] + ", " + dis["Victim's Age"] + " yrs";
    var cirMa = L.circleMarker(
      [dis.lat, dis.lng],
      {radius: 10, 
      color: clr, 
      opacity: 0.7, 
      stroke: false
    }).bindPopup(text);
    
    if (dis["Victim's Gender"] == 'Female') {
      femaleVic.addLayer(cirMa);
    } else if (dis["Victim's Gender"] == 'Male') {
      maleVic.addLayer(cirMa);
    } else {
      unknownGen.addLayer(cirMa);
    }
  });

}


