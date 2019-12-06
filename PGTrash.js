var mymap;
var markersLayer;

function loadMap() {
   mymap = L.map('mapid').setView([38.8162729,-76.7523043], 13);   
   L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
       attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
       maxZoom: 18,
       id: 'mapbox/streets-v11',
       accessToken: 'pk.eyJ1IjoiYXNhbmRpbjIxOCIsImEiOiJjazNwZm5kZDEwMm5qM3BwZTVwcmJvNGtpIn0.Omg_ZXfDgjgWA2-Lukxfow'
   }).addTo(mymap);
   markersLayer = new L.LayerGroup();
}

function populateLitterTypeDropDown() {
   console.log("Populating Litter Type drop-down list.");

   fetch('/api')
   .then(res => res.json())   
   .then(res => {
      var data = res.data;
      var litterTypes = new Set(); // Prevents adding duplicate entries
      for(let index = 0; index < data.length; index++) {
         // Add the entry in lower case format. This way we won't get
         // two entries such as: other and Other.
         // Only add the entry if one of the total is greater than zero.
         if(data[index].number_bags > 0 || data[index].total_tires > 0) {            
            litterTypes.add(data[index].type_litter.toLowerCase());
         }
      }
      
      // Add the options to the drop-down and build the documentation page
      var myselect = document.getElementById("type_filters_drop_down");
      for (let litterType of litterTypes) {
         let opt = document.createElement('option');
         opt.appendChild(document.createTextNode(litterType));
         // set value property of opt
         opt.value = litterType; 
         // add option to the end of select box
         myselect.appendChild(opt); 
      }
      return litterTypes;
   })
   .then(res => {
      console.log(res);
      return res;
    }); 
}

function loadDataByLitterType() {
   var myselect = document.getElementById("type_filters_drop_down");
   var litterType = myselect.options[myselect.selectedIndex].value;
   
   console.log("Filtering for Litter Type: " + litterType);
   
   // NOTE: The first thing we do here is clear the markers from the layer.
   markersLayer.clearLayers();
   
   fetch('/api')
      .then(res => res.json())      
      .then(res => {
         var data = res.data;
         for(var index = 0; index < data.length; index++) {
            var latitude = data[index].latitude;
            var longitude = data[index].longitude;
            if(data[index].type_litter == litterType || litterType == 'all') {
               // Create a marker
               var marker = L.marker([longitude, latitude]);
               // Add a popup to the marker
               marker.bindPopup(
                     "<b>" + data[index].organization + "</b><br>" +
                     "Litter Type: " + data[index].type_litter
               ).openPopup();
               // Add marker to the layer. Not displayed yet.
               markersLayer.addLayer(marker);
            }
          }
          // Display all the markers.
          markersLayer.addTo(mymap);
          return data;
      })
      .then(res => {
    	  console.log(res);
    	  return res;
      });      
}

function loadDataByOrganization(organization) {
   console.log("Filtering for Organization: " + organization);
   
   // NOTE: The first thing we do here is clear the markers from the layer.
   markersLayer.clearLayers();
   
   var api = "/api/organization";
   if(organization != 'all') {
      // Need to escape the "&" to %26 because it is a reserve character in the URL
      api = api + "?filter=" + organization.replace("&", "%26");
   }
   
   fetch(api)
      .then(res => res.json())      
      .then(res => {
        var data = res.data;
    	  for(var index = 0; index < data.length; index++) {
    	    var latitude = data[index].latitude;
    	    var longitude = data[index].longitude;

 	       // Create a marker
 	       var marker = L.marker([longitude, latitude]);
 	       // Add a popup to the marker
 	       marker.bindPopup(
 	             "<b>" + data[index].organization + "</b><br>" +
 	             "Litter Type: " + data[index].type_litter
 	       ).openPopup();
 	       // Add marker to the layer. Not displayed yet.
 	       markersLayer.addLayer(marker);
    	  }
    	  // Display all the markers.
    	  markersLayer.addTo(mymap);
    	  return data;
      })
      .then(res => {
    	  console.log(res);
    	  return res;
      });
}

function loadDataByTotalLitter(totalLitterType) {
   console.log("Filtering for Total Bags Litter: " + totalLitterType);
   
   // NOTE: The first thing we do here is clear the markers from the layer.
   markersLayer.clearLayers();
   
   fetch('/api')
      .then(res => res.json())      
      .then(res => {
         var data = res.data;
         for(var index = 0; index < data.length; index++) {
            var circle;
            var latitude = data[index].latitude;
            var longitude = data[index].longitude;
            
            if(totalLitterType == 'number_bags' || totalLitterType == 'all') {
               if(data[index].number_bags > 0) {
                  circle = L.circle([longitude, latitude], {
                     color: 'red',
                     fillColor: '#f03',
                     fillOpacity: 0.5,
                     radius: data[index].number_bags * 50
                  });
                  
                  // Add a popup to the circle
                  circle.bindPopup(
                        "<b>" + data[index].organization + "</b><br>" +
                        "Total Bags: " + data[index].number_bags
                  ).openPopup();
                  
                  // Add marker to the layer. Not displayed yet.
                  markersLayer.addLayer(circle);
               }
            } 
            
            if(totalLitterType == 'total_tires' || totalLitterType == 'all') {
               if(data[index].total_tires > 0) {
                  circle = L.circle([longitude, latitude], {
                     color: 'blue',
                     fillColor: '#00f',
                     fillOpacity: 0.5,
                     radius: data[index].total_tires * 50
                  });
                  
                  // Add a popup to the circle
                  circle.bindPopup(
                        "<b>" + data[index].organization + "</b><br>" +
                        "Total Tires: " + data[index].total_tires
                  ).openPopup();
                  
                  // Add marker to the layer. Not displayed yet.
                  markersLayer.addLayer(circle);
               }
            }
         }
         // Display all the markers.
         markersLayer.addTo(mymap);
         return data;
      })
      .then(res => {
    	  console.log(res);
    	  return res;
      });
}

function populateLitterTypeDocumentation() {
   console.log("Populating Litter Type documentation.");

   fetch('/api')
   .then(res => res.json())
   .then(res => {
      var data = res.data;
      var litterTypes = new Set(); // Prevents adding duplicate entries
      for(let index = 0; index < data.length; index++) {
         // Add the entry in lower case format. This way we won't get
         // two entries such as: other and Other.
         // Only add the entry if one of the total is greater than zero.
         if(data[index].number_bags > 0 || data[index].total_tires > 0) {         
            litterTypes.add(data[index].type_litter.toLowerCase());
         }
      }
      
      var mydocumentation = document.getElementById("Type of Litter");
      for (let litterType of litterTypes) {

         let heading = document.createElement("h5");
         let text = document.createTextNode(litterType);
         heading.appendChild(text);
         mydocumentation.appendChild(heading);
         
         let para = document.createElement("p");
         para.className += "text-grey";
         text = document.createTextNode("Represents " + litterType + " litter");
         para.appendChild(text);
         mydocumentation.appendChild(para);
         
         let mybreak = document.createElement("br");
         mydocumentation.appendChild(mybreak);
      }
      return litterTypes;
   })
   .then(res => {
      console.log(res);
      return res;
    }); 
}

function loadDataForLitterPerimeter() {
   fetch('/api')
   .then(res => res.json())  
   .then(res => {
      var data = res.data;
      // Initialize all points to the center of Prince George's County
      var northPoint = {longitude: 38.8162729, latitude: -76.7523043};
      var southPoint = {longitude: 38.8162729, latitude: -76.7523043};
      var westPoint = {longitude: 38.8162729, latitude: -76.7523043};
      var eastPoint = {longitude: 38.8162729, latitude: -76.7523043};
      
      for(let index = 0; index < data.length; index++) {         
         var latitude = data[index].latitude;
         var longitude = data[index].longitude;
         
         // Find the highest point to the north
         if(longitude > northPoint.longitude) {
            northPoint.longitude = longitude;
            northPoint.latitude = latitude;
         }
         // Find the lowest point to the south
         if(longitude < southPoint.longitude) {
            southPoint.longitude = longitude;
            southPoint.latitude = latitude;
         }
         // Find the highest point to the right
         if(latitude > eastPoint.latitude) {
            eastPoint.longitude = longitude;
            eastPoint.latitude = latitude;
         }
         // Find the lowest point to the left
         if(latitude < westPoint.latitude) {
            westPoint.longitude = longitude;
            westPoint.latitude = latitude;
         }
      }
      var polygon = L.polygon([
         [northPoint.longitude, northPoint.latitude],
         [eastPoint.longitude, eastPoint.latitude],
         [southPoint.longitude, southPoint.latitude],         
         [westPoint.longitude, westPoint.latitude]
         ]);
     markersLayer.addLayer(polygon);
     // Display all the markers.
     markersLayer.addTo(mymap);
   }); 
}

function openHome() {
   var tabcontent = document.getElementById("about");   
   tabcontent.style.display = "none";
   tabcontent = document.getElementById("documentation");
   tabcontent.style.display = "none";
   
   tabcontent = document.getElementById("wrapper");
   tabcontent.style.display = "block";
   tabcontent = document.getElementById("map");
   tabcontent.style.display = "block";
}

function openAbout() {
   var tabcontent = document.getElementById("wrapper");
   tabcontent.style.display = "none";
   tabcontent = document.getElementById("map");
   tabcontent.style.display = "none";   
   tabcontent = document.getElementById("documentation");
   tabcontent.style.display = "none";
   
   tabcontent = document.getElementById("about");
   tabcontent.style.display = "block";
   
   loadAboutPage(); 
}

function openDocumentation() {
   var tabcontent = document.getElementById("wrapper");
   tabcontent.style.display = "none";
   tabcontent = document.getElementById("map");
   tabcontent.style.display = "none";
   tabcontent = document.getElementById("about");
   tabcontent.style.display = "none";
   
   tabcontent = document.getElementById("documentation");
   tabcontent.style.display = "block";
   
   loadDocumentationPage();
}

function loadAboutPage() {
   document.getElementById("about").innerHTML='<object type="text/html" data="about.html" width="100%"></object>';   
}

function loadDocumentationPage() {
   document.getElementById("documentation").innerHTML='<object type="text/html" data="documentation.html" width="100%" height="400px"></object>';
}