//Bring in Express server and create application
const express = require("express");
const pieRepo = require("./repos/pieReo");
const app = express();

//Set port
const selectedPort = 5000;

//Create list of pies
let pies = pieRepo.get();

//use the Express router
const router = express.Router();

//Create GET to return a list of all pies
router.get("/", function (req, res, next) {
  res.status(200).json({
      "status": 200,
      "statusText": "OK",
      "message": "Pies are here!",
      "data": pies
  });
});

//Configure router so all routes are prefixed with /api/v1

app.use("/api/", router);

//Create server to listen on port 5000
const server = app.listen(selectedPort, function () {
  console.log(`Node server is running on http://localhost:${selectedPort}`);
});
