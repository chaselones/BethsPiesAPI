//Bring in Express server and create application
const express = require("express");
const pieRepo = require("./repos/pieRepo");
const app = express();

//Set port
const selectedPort = 5000;

//use the Express router
const router = express.Router();

//Create GET to return a list of all pies
router.get("/", function (req, res, next) {
  pieRepo.get(function(data){
    res.status(200).json({
        "status": 200,
        "statusText": "OK",
        "message": "Pies are here!",
        "data": data
      });
  }, function(err){
    next(err);
  })
  
});

router.get("/search", function(req,res,next){
  let searchObject = {
    "id": req.query.id,
    "name": req.query.name
  };

  pieRepo.search(searchObject, function(data){
    res.status(200).json({
      "status": 200,
      "statusText": "OK",
      "message": "Pies are here!",
      "data": data
    });
  }, function (err){
    next(err);
  });
});

router.get('/:id', function(req,res,next){
  pieRepo.getById(req.params.id, function(data){
    if(data){
      res.status(200).json({
        "status": 200,
        "statusText": "OK",
        "message": "Pie retrieved",
        "data": data
      });
    }else{
      res.status(404).json({
        "status": 404,
        "statusText": "Not Found",
        "message": "The Pie " + req.params.id + " could not be found.",
        "error": {
          "code": "Not found",
          "message": "The pie " + req.params.id + " could not be found."
        }
      });
    }
  }, function(err){
    next(err);
  });
});

//Configure router so all routes are prefixed with /api/v1

app.use("/api/", router);

//Create server to listen on port 5000
const server = app.listen(selectedPort, function () {
  console.log(`Node server is running on http://localhost:${selectedPort}`);
});
