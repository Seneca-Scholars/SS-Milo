import express from "express";
import cors from "cors";
import { searchUser } from "./controllers/peopleController.js";
import { updateUser } from "./controllers/updateController.js";
import { addUser } from "./controllers/addUserController.js";
import {
  initializeDatabase,
  insertDummyData,
} from "./controllers/dbController.js";
import { deleteUser } from "./controllers/deleteController.js";

const app = express();

app.use(cors());
app.use(express.json());

(async () => {
  try {
    await initializeDatabase();
    await insertDummyData();

    app.get("/search", async (req, res) => {
      const query = req.query.q;
      console.log('search req receieved"');

      try {
        const results = await searchUser(query);

        if (results) {
          res.json(results);
        } else {
          res.json({ message: "no users found" });
        }
        console.log(results);
      } catch (err) {
        console.error("err fetching users:", err);
      }
    });

    app.post("/add-user", async (req, res) => {
      const { firstName, lastName } = req.body;
      console.log("add user req received:", req.body);

      try {
        const userId = await addUser.create(firstName, lastName);
        res.status(201).send({ id: userId, firstName, lastName });
      } catch (err) {
        console.error("err in user.create", err);
        if (err.messages && err.messages.includes("UNIQUE constraint failed")) {
          return res.json({ message: "user already exists" });
        }
        return res.sendStatus(500);
      }
    });

    app.put("/user/:id", async (req, res) => {
      const userId = req.params.id;
      const updatedData = req.body;
      console.log(
        "PUT request with userId:",
        userId,
        "and updatedData:",
        updatedData
      );

      try {
        const updatedUser = await updateUser(userId, updatedData);

        if (updatedUser) {
          res.json(updatedUser);
        } else {
          console.log("user not updated", err);
        }
      } catch (error) {
        console.error("err updating user:", error);
        res.status(500).json({ message: "failed to update user" });
      }
    });

    app.delete("/user/:id", async (req, res) => {
      const userId = req.params.id;
      console.log("delete req for user:", userId);
      try {
        await deleteUser(userId);
        res.json({ message: "user deleted." });
      } catch (err) {
        console.error("err deleting user:".err);
      }
    });

    app.listen(3000, () => console.log("Listening on 3000"));
  } catch (err) {
    process.exit(1);
  }
})();
