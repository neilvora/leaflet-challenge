

// Create Dark Layer

const dark = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    id: "dark-v10",
    accessToken: API_KEY
  });
  

  // Create map with Dark Layer and coordinates on California
  const myMap = L.map("map", {
    center: [36.7783, -119.4179],
    zoom: 6,
    layers: dark
  });


  //Create and add legend to map

  var legend = L.control({position: "bottomright"})

  legend.onAdd = function() {
    var div = L.DomUtil.create("div","info legend")

    significanceColor = {'0-250':'white',
    '250-500':'yellow',
    '500-750':'orange',
    '750-1000':'red',
    '1000+':'magenta'};

    entries = Object.entries(significanceColor);

    div.innerHTML += "<h4>EQ Significance</h4>";

    for(var [key,value] of entries) {
      div.innerHTML +=
          '<i style="background:' + [value] + '"></i> ' +
          key + '<br><br>';
    }
    return(div);
  }

legend.addTo(myMap);

// Create a function for marker colors

// var color = function(sig) {
//   if (sig < 250) {
//     return 'white';
//   }
//   else if (sig < 500 && sig > 250) {
//     return 'yellow';
//   }
//   else if (sig < 750 && sig > 500) {
//     return 'orange';
//   }
//   else if (sig < 1000 && sig > 750) {
//     return 'red';
//   }
//   else if (sig > 1000) {
//     return 'magenta';
//   }
// }


// Load json data to plot markers

d3.json('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_month.geojson').then(data => {
    var features = data.features

    features.forEach(feature => {
      var mag = feature.properties.mag
      var sig = feature.properties.sig
      var time = feature.properties.time
      var place = feature.properties.place
      var coord = [feature.geometry.coordinates[1], feature.geometry.coordinates[0]] 

  // Conditionals for marker color
  let color = '';

  if (sig < 250) {
    color = 'white';
  }
  else if (sig < 500 && sig > 250) {
    color = 'yellow';
  }
  else if (sig < 750 && sig > 500) {
    color =  'orange';
  }
  else if (sig < 1000 && sig > 750) {
    color =  'red';
  }
  else {
    color =  'magenta';
  }

  // Conditionals for marker size

  let markerSize = '';

  if (mag < 2) {
    markerSize = mag * 500;
  }
  else if (mag < 3 && mag > 2) {
    markerSize = mag * 1000;
  }
  else if (mag < 4 && mag > 3) {
    markerSize = mag * 2000;
  }
  else {
    markerSize = mag * 4000;
  }

  var marker = L.circle(coord, {
    color: color,
    radius: markerSize
  });

  marker.addTo(myMap);
    })
  }
)