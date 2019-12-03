function loadDataByLitterType() {
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
    	  return groups;
      })
      .then(res => {
    	  console.log(res);
    	  return res;
      });      
}

function loadDataByOrganization() {
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
	    		  if (typeof groups[res[index].organization] === 'undefined') {
	    			  groups[res[index].organization] = new Array();
	    		  }

	    		  groups[res[index].organization].push({
	    	  			latitude: res[index].latitude,
	    	  			longitude: res[index].longitude,
	    		  });
	    	  }
	    	  return groups;
	      })
	      .then(res => {
	    	  console.log(res);
	    	  return res;
	      });      
}

function loadDataByTotalBagsLitter() {
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
	    	  return groups;
	      })
	      .then(res => {
	    	  console.log(res);
	    	  return res;
	      });      
}

function loadMap() {
   var mymap = L.map('mapid').setView([38.8162729,-76.7523043], 13);   
   L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
       attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
       maxZoom: 18,
       id: 'mapbox/streets-v11',
       accessToken: 'pk.eyJ1IjoiYXNhbmRpbjIxOCIsImEiOiJjazNwZm5kZDEwMm5qM3BwZTVwcmJvNGtpIn0.Omg_ZXfDgjgWA2-Lukxfow'
   }).addTo(mymap);
}