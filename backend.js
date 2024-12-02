var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

var app = express();
app.use(cors());
app.use(bodyParser.json());

const port = "8081";
const host = "localhost";
const url = "mongodb://127.0.0.1:27017";
const dbName = "secoms3190";
const client = new MongoClient(url);
const db = client.db(dbName);

app.get("/listCategories", async (req, res) => {
  await client.connect().then(() => {
    console.log("Connected to MongoDB");
  })
  try {
    const query = {};
    const results = await db.collection("articles").find(query).limit(100).toArray();
    console.log(results);
    res.status(200);
    res.send(results);
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
});

app.listen(port, () => {
  console.log("App listening at http://%s:%s", host, port);
});
