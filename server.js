const express = require("express");
const { accessControl, secondMiddleware } = require("./middleware");
const users = [
  { id: 1, name: "Muhammed Soylemez", place: "Gaziantep" },
  { id: 2, name: "Ebubekir Okutan", place: "Adana" },
];

const app = express();
const PORT = 5000;

app.use(express.json());

// app.use(accessControl); // uygulama kapsamı

// Get Request
// localhost:5000/users
app.get("/users", [accessControl, secondMiddleware], (req, res, next) => {
  // res.send("<h1>Hello Express</h1>");
  res.json({
    success: true,
    data: users,
  });
});
app.get("/products", (req, res, next) => {
  res.send("Products");
});

app.post("/users", (req, res, next) => {
  // console.log(req.body);
  const user = req.body;
  users.push(user);
  res.json({
    success: true,
    data: users,
  });
});
// users/1
app.put("/users/:id", (req, res, next) => {
  // console.log(req.params.id);
  const id = parseInt(req.params.id);
  for (let i = 0; i < users.length; i++) {
    if (users[i].id === id) {
      users[i] = {
          ...users[i],
          ...req.body
      };
    }
  }
  res.json({
    success: true,
    data: users
  });
});
app.delete("/users/:id", (req, res, next) => {
    const id = parseInt(req.params.id)
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === id) {
          users.splice(i,1)
        }
      }

  res.json({
    success: true,
    data: users
  });
});

app.listen(PORT, () => {
  console.log("Server Started PORT: " + PORT);
});
