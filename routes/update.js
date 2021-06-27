//update one entry
module.exports = function(app) {
  const car = require('../controllers/car.controller.js');
  app.get('/update/:newCar', car.updateById);
}
