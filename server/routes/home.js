var express        = require('express');
var router         = express.Router();
var ctrl           = require('../controllers/home');
var fs             = require('fs');
var verifyToken    = require('./middleware');
var jwt            = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config         = require('./config');
var nodemailer     = require('nodemailer');

router.post('/', verifyToken, doSome)

router.get('/', verifyToken, doSome)
router.get('/get-token', getToken)
router.post('/enviar-correo', enviarMail);

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

function enviarMail (req, res){
  return new Promise (function (resolve, reject) {
    var d = req.body
    console.log(d);
    var transporter = nodemailer.createTransport({
      host: 'smtp.gabssa.com.mx',
      port: 587,
      secure: false,
      ignoreTLS: true,
      auth: {
       user: 'blue@gabssa.com.mx',
       pass: 'BLUE12457'
      }
    });

    var correo = `
                  <p>Contacto de la pagina de Horus</p>
                  <h3>Detalles de contacto</h3>
                  <ul>
                    <li>Nombre: ${d.nombre}</li>
                    <li>Correo: ${d.mail}</li>
                    <li>Telefono: ${d.tel}</li>
                  </ul>
                  <h3>Mensaje</h3>
                  <p>${d.mensaje}</p>
                `

    var message = {
          from: '"Contacto de Horus"<blue@gabssa.com.mx>',
          to: 'jcarloshdezr@hotmail.com',
          subject: 'Contacto Horus Network',
          html: correo
      };

      transporter.sendMail(message, function(err) {
        if (!err) {
          console.log('Email enviado');
          res.json({CorreoEnviado: true});
        } else
          console.log(err);
        resolve();
      });
  });
}

module.exports = router;
