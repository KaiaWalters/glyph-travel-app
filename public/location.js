//=======================================

var input = document.getElementById("location")
var tracker = document.getElementById("find")
var submit = document.getElementById("submitBtn")
mapboxgl.accessToken = 'pk.eyJ1IjoiaG9tZWdyb3duMjM0NSIsImEiOiJjanlzbm1kOXMwbndwM2VtaW8xZndmNW1jIn0.V4YGm7EKRWqdkQrwkE1vwg';




//===========================================================
//GEO LOCATION
//===========================================

var errorMessage = document.getElementById("error-message");

function getLocation(id) {
  console.log('THE ID', id)
  if (navigator.geolocation) {
    // Disable submit button until we get location
    document.getElementById("submitBtn").disabled = true;
    navigator.geolocation.getCurrentPosition(geoLocationSuccess, geoLocationError, geoLocationOptions);
  } else {
    // quotes.innerHTML = "Geolocation is not supported by this browser.";
    errorMessage.innerHTML = "Geolocation is not supported by this browser.";
  }
}

//SHOWS POSITION OF THE USER

var geoloc;

function showPosition(position) {
  //put the post in here
 var geoloc = "Latitude: " + position.coords.latitude +
  "<br>Longitude: " + position.coords.longitude;
  console.log(geoloc)
console.log
  //console.log(Latitude,  Longitude)
}

var geoLocationOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

//--geolocation success--------
var pos = 0;
let btn_id = null; //why null?
let lng = '';
let lti = ''
function geoLocationSuccess(pos, id) { //pos error, it is not defined
  console.log(pos, btn_id)
  console.log(pos)
  var crd = pos.coords;

  console.log('Your current position is:');
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
    lng = `${crd.longitude}`
    lti = `${crd.latitude}`

  geoloc = {lat: crd.latitude, lon: crd.longitude}
  let lat =
  input.value = JSON.stringify(geoloc)

  console.log(input);

  document.getElementById("submitBtn").disabled = false;

  // ENABLE submit button

}

function geoLocationError(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

//EVENT LISTENER
tracker.addEventListener('click', function(event) {
// ("-") takes what is to the right of the hyphen and what is to the lef of the hyphen
    event.preventDefault();
    let id = String(this.id).split("-"); //the id variable is for finding the user id but is undefined must fix!
    //reassigns to get the right side of the id which is th eid number
    let uid = id[1] //trouble maker
    btn_id = uid;
    console.log('THIS IS THE USER ID', uid); //consoles this id

    console.log('THIS IS THE ARRAY ID', id)




//MAP BOX ===============================================================

/* given a query in the form "lng, lat" or "lat, lng" returns the matching
 * geographic coordinate(s) as search results in carmen geojson format,
 * https://github.com/mapbox/carmen/blob/master/carmen-geojson.md
 */


var map = new mapboxgl.Map({
container: 'map', // container id
style: 'mapbox://styles/mapbox/streets-v11',
center: [lti, lng], // starting position
zoom: 3 // starting zoom
});
console.log(lng, lti, map);



  map.addControl(new mapboxgl.GeolocateControl({
  positionOptions: {
  enableHighAccuracy: true
  },
  trackUserLocation: true
  }));
  getLocation(uid)


}) //end event
