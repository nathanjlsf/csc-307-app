import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const users = {
    users_list: [
      {
        id: "xyz789",
        name: "Charlie",
        job: "Janitor"
      },
      {
        id: "abc123",
        name: "Mac",
        job: "Bouncer"
      },
      {
        id: "ppp222",
        name: "Mac",
        job: "Professor"
      },
      {
        id: "yat999",
        name: "Dee",
        job: "Aspring actress"
      },
      {
        id: "zap555",
        name: "Dennis",
        job: "Bartender"
      }
    ]
  };

const findUserByName = (name) => {
    return users["users_list"].filter(
      (user) => user["name"] === name
    );
  };

const findUserById = (id) =>
    users["users_list"].find((user) => user["id"] === id);
  
app.get("/users/:id", (req, res) => {
    const id = req.params["id"]; //or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
      res.status(404).send("Resource not found.");
    } else {
      res.send(result);
    }
  });

const findUserByNameAndJob = (name, job) => {
    return users["users_list"].filter(
        (user) => user["name"] === name && user["job"] === job);
};

app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
  
    if (name !== undefined && job !== undefined) {
      let result = findUserByNameAndJob(name, job);
      result = { users_list: result };
      res.send(result);
    } else if (name !== undefined) {
      let result = findUserByName(name);
      result = { users_list: result };
      res.send(result);
    } else {
      res.send(users);
    }
  });

const deleteUserById = (id) => {
    const index = users["users_list"].findIndex((user) => user["id"] === id);
    if (index !== -1) {
        users["users_list"].splice(index, 1);
        return true;
    } else {
        return false
    }
};

app.delete("/users", (req, res) => {
    const id = req.query["id"];
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send("Resource not found.");
    } else {
        const isDeleted = deleteUserById(id);
        if (isDeleted) {
            res.send();
        } else {
        res.status(500).send("Failed to delete user.")
        }
    }
  });

const addUser = (user) => {
  const generateId = Math.random().toString(36).substring(7)
  user["id"] = generateId;
    users["users_list"].push(user);
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

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});