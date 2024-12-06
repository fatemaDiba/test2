import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
import express from "express";
import cors from "cors";
import "dotenv/config";
const app = express();
const port = process.env.PORT || 5001;

// middleware create
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.r7pee.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const database = client.db("userInfoDB");
    const userInfoCollection = database.collection("userInfoCollection");

    app.post("/users", async (req, res) => {
      const userInfo = req.body;
      // console.log("New user", userInfo);
      const result = await userInfoCollection.insertOne(userInfo);
      res.send(result);
    });

    app.get("/users", async (req, res) => {
      const cursor = userInfoCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // update get
    app.get("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await userInfoCollection.findOne(query);
      res.send(result);
    });
    app.put("/users/:id", async (req, res) => {
      const id = req.params.id;
      const updateUser = req.body;
      // console.log("Updated User Info", updateUser);
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateUserInfo = {
        $set: {
          name: updateUser.name,
          pass: updateUser.pass,
        },
      };
      const result = await userInfoCollection.updateOne(
        filter,
        updateUserInfo,
        options
      );
      res.send(result);
    });

    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      // console.log("delete from server", id);
      const query = { _id: new ObjectId(id) };
      const result = await userInfoCollection.deleteOne(query);
      res.send(result);
    });

    // Reg and login
    const userInfoCol2 = client.db("userInfoDb2").collection("userInfoCol2");

    app.post("/users2", async (req, res) => {
      const newUser = req.body;
      // console.log("New user in server", newUser);
      const result = await userInfoCol2.insertOne(newUser); /*database a disi*/
      res.send(result);
    });
    app.get("/users2", async (req, res) => {
      const cursor = userInfoCol2.find();
      const result = await cursor.toArray(); /*database theke ansi*/
      res.send(result);
    });
    app.delete("/users2/:id", async (req, res) => {
      const id = req.params.id;
      // console.log("Delete from server", id);
      const query = { _id: new ObjectId(id) };
      const result = await userInfoCol2.deleteOne(query); /*databsae theke dlt*/
      res.send(result);
    });

    app.patch("/users2", async (req, res) => {
      const email = req.body.email;
      const user = req.body;
      const filter = { email: email };
      const options = { upsert: true };
      const update = {
        $set: {
          lastSignInTime: user?.lastLoggedTime,
        },
      };
      const result = await userInfoCol2.updateOne(filter, update, options);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
