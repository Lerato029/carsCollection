//update more than one entry with the same name
module.exports = function(app) {
    const car = require('../controllers/car.controller.js');
    app.get('/updateMany/:byOwner', car.updateByOwner);
  }
  