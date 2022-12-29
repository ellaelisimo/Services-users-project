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

// app.get("/users", async (req, res) => {
//   const connection = await client.connect();
//   const data = await connection
//     .db(DB)
//     .collection(DBCollectionUsers)
//     .find()
//     .toArray();
//   await connection.close();
//   return res.send(data);
// });

app.get("/memberships", async (req, res) => {
  try {
    const connection = await client.connect();
    const memberships = await connection
      .db(DB)
      .collection(DBCollectionServices)
      .find()
      .sort({ price: 1 })
      .toArray();
    await connection.close();
    return res.send(memberships);
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.delete("/membership/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).send("ID was not provided.").end();
    return;
  }

  try {
    const con = await client.connect();
    const deleteMembership = await con
      .db(DB)
      .collection(DBCollectionServices)
      .deleteOne({ _id: ObjectId(id) });

    await con.close();

    res.send(deleteMembership).end();
  } catch (err) {
    res.status(500).send({ err }).end();
    throw Error(err);
  }
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
