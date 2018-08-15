var express        = require('express');
var router         = express.Router();
var ctrl           = require('../controllers/home');
var fs             = require('fs');
var verifyToken    = require('./middleware');
var jwt            = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config         = require('./config');

router.post('/', verifyToken, doSome)

router.get('/', verifyToken, doSome)
router.get('/get-token', getToken)

async function doSome (req, res) {
  // var d = req.body;
  // let aw = await ctrl.doSome()
  // res.json(aw)
  res.json({err: false, userId: req.userId})
}

function getToken(req, res) {
  var token = jwt.sign({ id: 1 }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
  res.json({ auth: true, token: token });
}

module.exports = router;
