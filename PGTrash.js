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

function loadDataByTotalBagsLitter(bagsType) {
   console.log("Filtering for Total Bags Litter: " + bagsType);
   
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
    		  if (typeof groups[res[index].total_bags_litter] === 'undefined') {
    			  groups[res[index].total_bags_litter] = new Array();
    		  }

    		  groups[res[index].total_bags_litter].push({
    	  			latitude: res[index].latitude,
    	  			longitude: res[index].longitude,
    		  });
    	  }
    	 if(bagsType === 'all') {
          return groups;
       } else {
         return groups[bagsType];
       }
      })
      .then(res => {
    	  console.log(res);
    	  return res;
      });
}