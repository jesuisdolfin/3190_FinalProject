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
  });
  try {
    const query = {};
    const results = await db
      .collection("articles")
      .find(query)
      .limit(100)
      .toArray();
    console.log(results);
    res.status(200);
    res.send(results);
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Connect to MongoDB
    await client.connect();
    console.log("Connected to MongoDB");

    const collection = db.collection("logins");
    const result = await collection.insertOne({
      username,
      password,
      timestamp: new Date(),
    });

    // Success response
    res.status(200).send({ message: "Login stored successfully" });
  } catch (err) {
    console.error("Error storing login:", err);
    res.status(500).send({ error: "Failed to store login" });
  } finally {
    await client.close();
  }
});

app.post("/contactus", async (req, res) => {
  const { name, email, topic, message } = req.body;

  try {
    // Connect to MongoDB
    await client.connect();
    console.log("Connected to MongoDB");

    const collection = db.collection("contacts");
    const result = await collection.insertOne({
      name,
      email,
      topic,
      message,
    });

    // Success response
    res.status(200).send({ message: "Contact submission stored successfully" });
  } catch (err) {
    console.error("Error storing contact submission:", err);
    res.status(500).send({ error: "Failed to store contact submission" });
  } finally {
    await client.close();
  }
});

app.put("/login/:username", async (req, res) => {
  try {
    const username = req.params.username; // Read parameter id as string
    console.log("User to update:", username);

    // Connect to MongoDB (ensure this is done once at the application level)
    await client.connect();

    const query = { username: username };

    // Data for updating the document, typically comes from the request body
    console.log(req.body);
    const updateData = {
      $set: {
        password: req.body.password,
      },
    };

    // Check if user exists
    const userExists = await db.collection("logins").findOne(query);
    if (!userExists) {
      res.status(404).send({ message: "User not found" });
      return;
    }

    // Update user
    const result = await db.collection("logins").updateOne(query, updateData);

    if (result.modifiedCount === 0) {
      res.status(400).send({ message: "User update failed" });
      return;
    }

    // Fetch the updated user data
    const updatedUser = await db.collection("logins").findOne(query);

    // Response to client
    res.status(200).send(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.delete("/login/:username", async (req, res) => {
  try {
    // Read parameter id as string
    const username = req.params.username;
    console.log("User to delete:", username);

    // Connect Mongodb (ensure this is done once at the application level)
    await client.connect();

    // Create query
    const query = { username: username };

    // Read data of user to be deleted
    const userDeleted = await db.collection("logins").findOne(query);

    if (!userDeleted) {
      res.status(404).send({ message: "User not found" });
      return;
    }

    // Delete user
    const result = await db.collection("logins").deleteOne(query);

    // Response to client
    res.status(200).send(userDeleted);
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log("App listening at http://%s:%s", host, port);
});
