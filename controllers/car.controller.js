/* Creating CRUD operations - each function is requested by different routes*/

//get the Car model schema
const Car = require("../models/Cars.js");

/* =============================================Create */
exports.create = function (req, res) {
  //get params with specs for new car and split them
  const carDetails = req.params.car.split(",");

  //separating data from array
  const newModel = parseInt(carDetails[0]);
  const newMake = carDetails[1];
  const newOwner = carDetails[2];
  const newRegistration = carDetails[3];

  //define new car database entry
  let carModel = new Car({
    model: newModel,
    make: newMake,
    owner: newOwner,
    registration: newRegistration,
  });

  //use save method to save new entry
  carModel.save(function (err, data) {
    //check if there's an error and send it to client
    if (err) {
      res
        .status(500)
        .send({ message: "Some error occurred while creating the car." });
    } else {
      //no errors then send it to client success message
      res.send(`${newMake} has been added to the collection!`);
    }
  });
};

/* =============================================Read */
exports.findAll = function (req, res) {
  //use find method to find all items in collection
  Car.find(function (err, cars) {
    if (err) {
      //check if there's an error and send it to client
      res
        .status(500)
        .send({ message: "Some error occurred while retrieving cars." });
    } else {
      //else send data to client
      res.send(cars);
    }
  });
};

/* =============================================Read Older than 5 years */
exports.findOlder = function (req, res) {
  //find method by following query
  Car.find({ model: { $lte: 2016 } }, function (err, cars) {
    if (err) {
      //check if there's an error and send it to client
      res
        .status(500)
        .send({ message: "Some error occurred while retrieving cars." });
    } else {
      //else send data to client
      res.send(cars);
    }
  });
};

/* =============================================Update One*/
exports.updateById = function (req, res) {
  //get params with specs for new car and split them
  const newCar = req.params.newCar.split(",");

  //separating data from array
  const newModel = parseInt(newCar[0]);
  const newMake = newCar[1];
  const newOwner = newCar[2];
  const newRegistration = newCar[3];
  const id = newCar[4];

  //update by id with new values
  let query = { _id: id };
  Car.findOneAndUpdate(
    query,
    {
      model: newModel,
      make: newMake,
      owner: newOwner,
      registration: newRegistration,
    },
    { new: true },
    function (err, doc) {
      if (err) {
        //check if there's an error and send it to client
        res.send("ERROR: Not Updated. " + err);
      }
      // success message
      res.send(`Updated`);
    }
  );
};

/* =============================================Update Many*/
exports.updateByOwner = function (req, res) {
  //get params with specs for new car and split them
  const newCar = req.params.byOwner.split(",");

  //separate array
  const newOwner = newCar[0];
  const currentOwner = newCar[1];

  //update criteria
  let query = { owner: currentOwner };

  //updating many entries with the same name to a different name
  Car.updateMany(query, { $set: { owner: newOwner } }, function (err, doc) {
    if (err) {
      //check if there's an error and send it to client
      res.send("ERROR: Could Not Update. " + err);
    }
    // success message
    res.send(`Updated`);
  });
};

/* =============================================Delete One*/
exports.deleteCarsById = function (req, res) {
  //get id from URL params
  const id = req.params.id;

  //remove one based on id
  Car.findOneAndRemove({ _id: id }, function (err) {
    if (err) {
      //check for errors to send to client
      res.send("ERROR: Cars NOT removed. " + err);
    }
    //notify client of successful removal of entry
    res.send("Cars removed");
  });
};
