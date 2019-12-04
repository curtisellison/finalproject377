var mymap;
var markersLayer = new L.LayerGroup();

function loadMap() {
   mymap = L.map('mapid').setView([38.8162729,-76.7523043], 13);   
   L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
       attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
       maxZoom: 18,
       id: 'mapbox/streets-v11',
       accessToken: 'pk.eyJ1IjoiYXNhbmRpbjIxOCIsImEiOiJjazNwZm5kZDEwMm5qM3BwZTVwcmJvNGtpIn0.Omg_ZXfDgjgWA2-Lukxfow'
   }).addTo(mymap);
}

function loadDataByLitterType(litterType) {
   console.log("Filtering for Litter Type: " + litterType);
   
   fetch('/api')
      .then(res => res.json())
      .then(res => res.data.map(c => {
    	  return {
              latitude: c.latitude,
              longitude: c.longitude,
              organization: c.organization,
              type_litter: c.type_litter,
              total_bags_litter: c.total_bags_litter
          };
      }))
      .then(res => {
    	  var groups = [];
    	  for(var index = 0; index < res.length; index++) {
    		  if (typeof groups[res[index].type_litter] === 'undefined') {
    			  groups[res[index].type_litter] = new Array();
    		  }

    		  groups[res[index].type_litter].push({
    	  			latitude: res[index].latitude,
    	  			longitude: res[index].longitude,
    		  });
    	  }
    	  if(litterType === 'all') {
    	     return groups;
    	  } else {
    	    return groups[litterType];
    	  }
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
   
   fetch('/api')
      .then(res => res.json())
      .then(res => res.data.map(c => {
         // Keep only the properties we want to use.
    	  return {
              latitude: c.latitude,
              longitude: c.longitude,
              organization: c.organization,
              type_litter: c.type_litter,
              total_bags_litter: c.total_bags_litter
          };
      }))
      .then(res => {
    	  for(var index = 0; index < res.length; index++) {
    	    var latitude = res[index].latitude;
    	    var longitude = res[index].longitude;
    	    if(res[index].organization == organization || organization == 'all') {
    	       // Create a marker
    	       var marker = L.marker([longitude, latitude]);
    	       // Add a popup to the marker
    	       marker.bindPopup(
    	             "<b>" + res[index].organization + "</b><br>" +
    	             "Litter Type: " + res[index].type_litter
    	       ).openPopup();
    	       // Add marker to the layer. Not displayed yet.
    	       markersLayer.addLayer(marker);
    	    }
    	  }
    	  // Display all the markers.
    	  markersLayer.addTo(mymap);
    	  return res;
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
      .then(res => res.data.map(c => {
    	  return {
              latitude: c.latitude,
              longitude: c.longitude,
              organization: c.organization,
              type_litter: c.type_litter,
              number_bags: c.number_bags,
              total_tires: c.total_tires,              
          };
      }))
      .then(res => {
         for(var index = 0; index < res.length; index++) {
            var circle;
            var latitude = res[index].latitude;
            var longitude = res[index].longitude;
            
            if(totalLitterType == 'number_bags' || totalLitterType == 'all') {
               if(res[index].number_bags > 0) {
                  circle = L.circle([longitude, latitude], {
                     color: 'red',
                     fillColor: '#f03',
                     fillOpacity: 0.5,
                     radius: res[index].number_bags * 50
                  });
                  
                  // Add a popup to the circle
                  circle.bindPopup(
                        "<b>" + res[index].organization + "</b><br>" +
                        "Total Bags: " + res[index].number_bags
                  ).openPopup();
                  
                  // Add marker to the layer. Not displayed yet.
                  markersLayer.addLayer(circle);
               }
            } 
            
            if(totalLitterType == 'total_tires' || totalLitterType == 'all') {
               if(res[index].total_tires > 0) {
                  circle = L.circle([longitude, latitude], {
                     color: 'blue',
                     fillColor: '#00f',
                     fillOpacity: 0.5,
                     radius: res[index].total_tires * 50
                  });
                  
                  // Add a popup to the circle
                  circle.bindPopup(
                        "<b>" + res[index].organization + "</b><br>" +
                        "Total Tires: " + res[index].total_tires
                  ).openPopup();
                  
                  // Add marker to the layer. Not displayed yet.
                  markersLayer.addLayer(circle);
               }
            }
         }
         // Display all the markers.
         markersLayer.addTo(mymap);
         return res;
      })
      .then(res => {
    	  console.log(res);
    	  return res;
      });
}