const express = require("express");
const fetch = require("node-fetch");

const app = express();
const port = process.env.port || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static("./"));

app.get("/api", (req, res) => {
  const baseURL =
    "https://data.princegeorgescountymd.gov/resource/9tsa-iner.json";
  fetch(baseURL)
    .then(r => r.json())
    .then(data => {
      console.log(data);
      res.send({ data: data });
    })
    .catch(err => {
      console.log(err);
      res.redirect("/error");
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));