const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");

require("dotenv").config();

const PORT = process.env.PORT || 5003;
const app = express();
const URI = process.env.URI;
const client = new MongoClient(URI);
const DB = process.env.DB;
const DBCollectionServices = process.env.DBCollectionServices;
const DBCollectionUsers = process.env.DBCollectionUsers;

app.use(express.json());
app.use(cors());

app.get("/users", async (req, res) => {
  const connection = await client.connect();
  const data = await connection
    .db(DB)
    .collection(DBCollectionUsers)
    .find()
    .toArray();
  await connection.close();
  return res.send(data);
});

app.get("/services", async (req, res) => {
  try {
    const connection = await client.connect();
    const data = await connection
      .db(DB)
      .collection(DBCollectionServices)
      .find()
      .toArray();
    await connection.close();
    return res.send(data);
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
