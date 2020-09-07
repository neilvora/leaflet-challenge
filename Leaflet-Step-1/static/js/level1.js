

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
