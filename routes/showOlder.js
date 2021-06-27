//show cars older than 5 years
module.exports = function(app) {
    const car = require('../controllers/car.controller.js');
    app.get('/carsOlder', car.findOlder);
  }
  