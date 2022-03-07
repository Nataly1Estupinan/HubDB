const express = require("express");
const axios = require("axios");
const app = express();


app.use(express.static(__dirname + '/public'));

const hubspot = require("@hubspot/api-client");
const hubspotClient = new hubspot.Client({
  apiKey: "a011e7ae-6db8-431b-804a-0f9449a9a6c9",
});
const tableId = 5319978;

//Get rows of table developer_5
app.get("/contacts", async (req, res) => {
  try {
    const apiResponse = await hubspotClient.cms.hubdb.rowsApi.getTableRows(
      tableId
    );
    res.send(apiResponse);
  } catch (err) {
    res.send(err);
  }
});

//Get contact by Id
app.get("/contacts/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const apiResponse = await hubspotClient.cms.hubdb.rowsApi.getTableRow(
      tableId,
      id
    );
    res.send(apiResponse.values);
  } catch (err) {
    res.send(err);
  }
});

//Get draft with changes
app.get("/draft", async (req, res) => {
  
    const apiResponse = await hubspotClient.cms.hubdb.rowsApi.readDraftTableRows(tableId)   
    console.log(apiResponse)
    res.send(apiResponse);
  
});

// //POST Create a new row
app.post("/contacts", (req, res) => {
      
  const values = req.body
  
  try {
    hubspotClient.cms.hubdb.rowsApi.createTableRow(tableId,values)
    hubspotClient.cms.hubdb.tablesApi.publishDraftTable(tableId);
    res.send("The contact has been added successfully");
  } catch (err) {
    res.send(err);
  }
});

//update
app.put('/contacts/:id', async (request,response)  => {

    const id =request.params.id
    const values=request.body

    try {
        const apiResponse = await hubspotClient.cms.hubdb.rowsApi.updateDraftTableRow(tableId,id,values)
        hubspotClient.cms.hubdb.tablesApi.publishDraftTable(tableId)
        response.send("The contact has been updated successfully")
        } catch (error) {
        response.send(error)
    
        }
});

//delete rows
app.delete("/contacts/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const apiResponse = await hubspotClient.cms.hubdb.rowsApi.purgeDraftTableRow(
      tableId,
      id
    );
    hubspotClient.cms.hubdb.tablesApi.publishDraftTable(tableId);
    res.send("The contact has been deleted successfully");
  } catch (error) {
    res.send(error);
  }
});


app.listen(3000, () => console.log("Listening on http://localhost/3000"));
