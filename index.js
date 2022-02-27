const express = require("express");
const axios = require("axios");

const app = express();

// app.set('view engine', 'pug');
// app.use(express.static(__dirname + '/public'));

//API KEY PRUEBA
const API_KEY = "2017838c-4ff6-47bd-975e-d14acdadb011";

//Get table "Back-End Developer Test 5"
app.get("/contacts", async (req, res) => {
  const contacts = `https://api.hubapi.com/cms/v3/hubdb/tables/5319978?hapikey=${API_KEY}`;
  const headers = {
    Authorization: `Bearer ${API_KEY}`,
    "Content-type": "application/json",
  };
  try {
    const resp = await axios.get(contacts, { headers });
    const data = resp.data;
    res.json(data);
    //res.render('contacts', { title: 'Contacts | HubSpot APIs', data });
  } catch (error) {
    console.error(error);
  }
});


app.listen(3000, () => console.log("Listening on http://localhost/3000"));
