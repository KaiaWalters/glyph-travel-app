# International Space Station Tracker: A Complex API Project
[Link to the Project:GeoGlyph](https://geo-glyph.herokuapp.com/) 

___
<img width="1228" alt="Screen Shot 2019-08-28 at 3 44 36 PM" src="https://user-images.githubusercontent.com/49502261/63887440-ce0b9680-c9aa-11e9-9ceb-806926cedccb.png">

GeoGlyph is a full stack application that utilizes geolocation tracking to empower people to document the histories of their communities. Inspired by the recent rise in gentrification in Boston and the need to preserve the voices and cultures that exist there.  

## How its Made
The application is built using Node.Js, Express, MongoDB, JSON, XML, HTML, CSS, JavaScript,  and Mapbox.


## Reflections
Working with the MapBox API was one of the most interesting parts of this project. When it came to creating the /maps page, I had to figure out how to connect the map itself to my database. The map was originally created to take in hard coded data from a javascript variable. If you look throught the code you will see the object "stores" in the map.js page. I had to find a way to format my response into JSON format so that the maps page could digest the info and display, not only glyph info in the side bar, but icons on the map as well. 

## Installation
* Clone repo
* npm install

## Usage
* Head to file 
* run node server.js
* Navigate to localhost: 8080


