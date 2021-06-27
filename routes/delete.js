//delete an entry
module.exports = function(app) {
  const car = require('../controllers/car.controller.js');
  app.get('/delete/:id', car.deleteCarsById);
}
