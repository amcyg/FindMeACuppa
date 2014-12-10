INTRODUCTION
------------
Find Me A Cuppa is a web app used to locate the nearest coffeeshops in your area.
Currently, the database is limited to 11 coffeeshops near Theranos HQ in Palo Alto. 

HOW TO RUN
------------
Run the app through Plunker:
http://embed.plnkr.co/SHHnnVLjZBXqYhHYgTYY/preview

By default, the app uses geolocation to determine your initial starting point.
If you do not allow the browser to access your location, or this feature is not available
in your browser, the app will default to the Theranos HQ at coordinates (37.408248, -122.1452764).

Enter your preferred address or Google landmark, and the app will return the five 
coffeeshops closest to your location. Click on the coffee pins to get more information
about each coffee shop, including distance (in kilometers and miles), address, and rating.

TECHNOLOGIES
-------------
Find Me A Cuppa uses the Google Maps API. For simplicity (mainly to avoid potential conflicts
with the Google Maps API) no formal Javascript MV* framework (such as Backbone.js 
 or Angular.js) is currently used. However, functions are divided into separate
model, view, and controller files for clarity and modularity. 

models.js
* Wrangles the data in locations.json into a more accessible format
* Latitude/longitude data is parsed into a Google Maps LatLng object
* Errors in the data (such as inconsistent formatting in ratings keys) are accounted for

controllers.js
* Manages the behavior of the search bar

views.js
* Connects with the Google Maps API
* Controls default starting point using HTML5 geolocation
* Renders coffee markers on the map for each coffee shop
* Manages infowindow displays, including distance unit toggling (mi vs. km)

FUTURE STEPS
--------------
Some future features to be implemented include:
* Parsing through the locations.json data to make capitalization in titles more consistent
* Re-implementing the Google Maps infowindows with infoboxes to be able to change popup styles
* Iterate marker animations so that they all don't drop at once
* Re-implement using Angular.js to take advantage of two-way data bindings
* Re-implement distances based on walking or biking time instead of distance