function getMapWithPropertiesNeeded(data_row) {
   // Keep only the properties we want to use.
   return {
         latitude: data_row.latitude,
         longitude: data_row.longitude,
         organization: data_row.organization,
         type_litter: data_row.type_litter,
         total_bags_litter: data_row.total_bags_litter,
         number_bags: data_row.number_bags,
         total_tires: data_row.total_tires
     };
}

const express = require("express");
const fetch = require("node-fetch");

const app = express();
const port = process.env.PORT || 80;

var path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static("./"));

app.get("/api", (req, res) => {
  const baseURL =
    "https://data.princegeorgescountymd.gov/resource/9tsa-iner.json";
  fetch(baseURL)
    .then(r => r.json())
    .then(res => res.map(c => {
         // Keep only the properties we want to use.
         return getMapWithPropertiesNeeded(c);
      }))
    .then(data => {
      console.log(data);
      res.send({ data: data });
    })
    .catch(err => {
      console.log(err);
      res.redirect("/error");
    });
});

app.get("/api/organization", (req, res) => {
   const baseURL =
     "https://data.princegeorgescountymd.gov/resource/9tsa-iner.json";
   fetch(baseURL)
     .then(r => r.json())
     .then(res => res.map(c => {
          // Keep only the properties we want to use.
          return getMapWithPropertiesNeeded(c);
       }))
     .then(data => {
        var result = [];
        // Use regular expression to replace all double quotes with empty character
        var filter = Object.keys(req.query).length == 0 ? "" : req.query.filter;
        for(var index = 0; index < data.length; index++) {
           if(filter == "" || data[index].organization == filter) {
              result.push(data[index]);
           }
        }
        return result;
     })
     .then(data => {
       console.log(data);
       res.send({ data: data });
     })
     .catch(err => {
       console.log(err);
       res.redirect("/error");
     });
 });

app.put("/", (req, res) => {
   res.sendFile(path.join(__dirname + '/index.html'));
});

app.post("/", (req, res) => {
   res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));