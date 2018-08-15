var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.redirect('inicio')
});

router.get('/inicio', function(req, res) {
  res.render('inicio')
});


module.exports = router;
