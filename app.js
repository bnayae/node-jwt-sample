// https://getpocket.com/a/read/2000761086

const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

const secretKey = "this is my not so secret key";

app.get("/api", (req, res) => {
  res.json({
    message: "welcome api"
  });
});

app.post("/api/login", (req, res) => {
  // TODO: Get user from the payload,  go to storage and validate the user
  const user = {
    id: 1,
    name: "Bnaya",
    email: "bnaya@gmail.com"
  };

  jwt.sign({ user }, secretKey, (err, token) => {
    res.json({
      token
    });
  });
});

app.post("/api/posts", verifyToken /* middleware */, (req, res) => {
  jwt.verify(req.token, secretKey, (err, authData) => {
    if (err) {
      //console.log(err);
      res.sendStatus(403);
    } else {
      res.json({
        message: "post created ...",
        authData
      });
    }
  });
});

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
  // Get header value
  const bearerHeader = req.headers["authorization"];
  // Check if undefined
  if (typeof bearerHeader !== "undefined") {
    // set the token
    req.token = bearerHeader;
    // next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

const port = process.env.process || 5000;
app.listen(port, () => console.log(`listening on port ${port}`));
