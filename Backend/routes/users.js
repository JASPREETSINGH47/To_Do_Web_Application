var express = require('express');
var router = express.Router();
let listControllers = require('../controllers/listControllers')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/list', listControllers.listOfItems);
router.post('/getlist', listControllers.getAllItems);
 router.post('/deleteitem', listControllers.deleteItem);

module.exports = router;
