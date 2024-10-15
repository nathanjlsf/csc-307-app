import express from "express";
import cors from "cors";
import userServices from "./user-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", async (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  try {
    const result = await userServices.getUsers(name, job);
    res.send({ users_list: result });
  } catch (error) {
    res.status(500).send(error);
  }
});
 
app.get("/users/:id", (req, res) => {
    const id = req.params["id"]; //or req.params.id
    userServices.findUserById(id)
      .then((user) => {
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).send("User not found.");
        }
      })
      .catch((error) => {
        res.status(500).send("Error getting user.");
      });
  });

app.delete("/users/:id", (req, res) => {
    const id = req.params["id"];
    userServices.findByIdAndDelete(id)
      .then((user) => {
        if (!user) {
          res.status(404).send("User not found.");
        } else {
          user.remove()
            .then(() => res.status(204).send())
            .catch((error) => res.status(500).send("Error deleting user."));
        }
      })
      .catch((error) => {
        res.status(500).send("Error finding user.");
      });
  });

const addUser = (user) => {
  const generateId = Math.random().toString(36).substring(7)
  user["id"] = generateId;
  user["users_list"].push(user);
  return user;
  };
  
app.post("/users", (req, res) => {
  const {name, job} = req.body;
  if (!name || !job) {
    return res.status(400).send({error: "Name and job required"});
  }

  try {
    const newUser = addUser({name, job});
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).send({error : "Failed to create user"});
  }
  });

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});