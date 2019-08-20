mapboxgl.accessToken = 'pk.eyJ1IjoiaG9tZWdyb3duMjM0NSIsImEiOiJjanlzbm1kOXMwbndwM2VtaW8xZndmNW1jIn0.V4YGm7EKRWqdkQrwkE1vwg';
// This adds the map to your page
var map = new mapboxgl.Map({
  // container id specified in the HTML
  container: 'map',
  // style URL
  style: 'mapbox://styles/mapbox/streets-v11',
  //initial position in [lon, lat] format
  center: [ -71.0590, 42.3582],
  // center: [-77.034084142948,
  //         38.909671288923],
  // initial zoom
  zoom: 14
});

// Creating Icons============================================

var storesTwo = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
            -71.0577994,
          42.3569852
        ]
      },
      "properties": {
        "message": "Success is a foregone conclusion!",
      }
    }]
  }


var stores = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
        -71.0590,
          42.3582
        ]
      },
      "properties": {
        "phoneFormatted": "(202) 234-7336",
        "phone": "2022347336",
        "address": "1471 P St NW",
        "city": "Washington DC",
        "country": "United States",
        "crossStreet": "at 15th St NW",
        "postalCode": "20005",
        "state": "D.C.",
        "message": "rubber duck"
      }
    }
  ]
};


map.on('load', function(e) {
  // Add the data to your map as a layer
  //##### fetch(`/maps?lat=${location.coords.latitude}&lon=${location.coords.longitude}`)

  fetch(`/mapsdata`) //gets raw data about JSON Object with dtata for all of the loc map box reads puts o map

    .then(results => {
      // console.log("COVERTING To Json now?")
      return results.json() //method
    })
    .then(mapResults => {
      console.log("Waka WAKA - Fozi Bear", mapResults.features[0].geometry.coordinates)
      console.log(mapResults)
      console.log("JSON results from /nearbyMessages:",JSON.stringify(mapResults));

      map.loadImage('img/red-email-icon-png-27.jpg', function(error, image) {
      if (error) throw error;
      map.addImage('cat', image);
      map.addLayer({
        id: 'locations',
        type: 'symbol',
        // Add a GeoJSON source containing place coordinates and information.
        source: {
          type: 'geojson',
          data: mapResults,
          // data: mapResults,
          buffer: 512// how can i define message data here? HERE
        },
        layout: {
          "icon-image": "cat",
          "icon-size": 0.05
          // 'icon-image':'{marker-symbol}-15',
          // 'icon-allow-overlap': true,
        }


      });
      map.on('click', function(e) {
        // Query all the rendered points in the view
        var features = map.queryRenderedFeatures(e.point, { layers: ['locations'] });
        if (features.length) {
          var clickedPoint = features[0];
          // 1. Fly to the point
          flyToStore(clickedPoint);
          // 2. Close all other popups and display popup for clicked store
          createPopUp(clickedPoint);
          // 3. Highlight listing in sidebar (and remove highlight for all other listings)
          var activeItem = document.getElementsByClassName('active');
          if (activeItem[0]) {
            activeItem[0].classList.remove('active');
          }
          // Find the index of the store.features that corresponds to the clickedPoint that fired the event listener
          var selectedFeature = clickedPoint.properties.id;
          var listings = document.getElementsByClassName("listing")

          for (var i = 0; i < listings.length; i++) {
            if (listings[i].dataset.id === selectedFeature) { //gets the data attr
              listings[i].classList.add('active'); //set active on the onne looked at
            }
          }
          // Select the correct list item using the found index and add the active class
          // var listing = document.getElementById('listing-' + selectedFeatureIndex);
          // listings.classList.add('active');
        }
});
    });
  })

  function flyToStore(mapResults) {
    map.flyTo({
      center: mapResults.geometry.coordinates, //features did not exist
      zoom: 15
    });
  }

  function createPopUp(mapResults) {
    var popUps = document.getElementsByClassName('mapboxgl-popup');
    // Check if there is already a popup on the map and if so, remove it
    if (popUps[0]) popUps[0].remove();

    var popup = new mapboxgl.Popup({ closeOnClick: false })
      .setLngLat(mapResults.geometry.coordinates)
      .setHTML('<h3>GeoGlyph</h3>' +
        '<h4>' + mapResults.properties.message + '</h4>')
      .addTo(map);
  }

});




//================================

// function buildLocationList(data) {
//
//   alert("comatose")
//   // Iterate through the list of stores
//   for (i = 0; i < data.features.length; i++) {
//     var currentFeature = data.features[i];
//
//     // Shorten data.feature.properties to `prop` so we're not
//     // writing this long form over and over again.
//
//     var prop = currentFeature.properties;
//
//     console.log(prop)
//     console.log(mapResults.features)
//     console.log("Should be coordinates!", md.location.coordinates)
//     // Select the listing container in the HTML and append a div
//     // with the class 'item' for each store
//     //
//     // var listings = document.getElementById('listings');
//     // var listing = listings.appendChild(document.createElement('div'));
//     // listing.className = 'item';
//     // listing.id = 'listing-' + i;
//
//     // Create a new link with the class 'title' for each store
//     // and fill it with the store address
//     var link = listing.appendChild(document.createElement('a'));
//     link.href = '#'; //going to have to create a get to have the url of another
//     link.className = 'title';
//     link.dataPosition = i;
//     link.innerHTML = prop.name; //or should this be prop.name?
//
//
//     // Create a new div with the class 'details' for each store
//     // and fill it with the city and phone number
//     var details = listing.appendChild(document.createElement('div'));
//     details.innerHTML = features.properties;
//     if (prop.phone) {
//       details.innerHTML += ' · ' + prop.phoneFormatted;
//     }
//   }
// }
