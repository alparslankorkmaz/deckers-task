const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

// load JSON data
const jsonData = JSON.parse(
  fs.readFileSync("./src/prospect_eval.json", "utf8")
);

// mock API dndpoint to serve order data
app.get("/api/orders/latest", (req, res) => {
  res.json(jsonData);
});

// start the server
const PORT = 8080;
app.listen(PORT, () => {
  console.log(
    `Mock API is running at http://localhost:${PORT}/api/orders/latest`
  );
});
