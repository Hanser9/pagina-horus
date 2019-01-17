require('../services/home');
var alertify = require('alertifyjs');
var nodemailer     = require('nodemailer');

angular.module(MODULE_NAME)
.controller('homeCtrl', ['$scope', 'HomeService', '$timeout', function($scope, HomeService, $timeout) {
  var ctrl = this;
  $scope.loading = false;

  $scope.init = init;
  $scope.btnEnviarCorreo = btnEnviarCorreo;

  $scope.correo = {}

  function init() {
    console.log('build cargado');
  }

  function validar_email(email) {
    var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email) ? true : false;
  }

  function btnEnviarCorreo() {
    $scope.loading = true;
    var correo = $scope.correo
    if (correo.nombre === undefined || correo.mail === undefined || correo.tel === undefined || correo.mensaje === undefined) {
        alertify.error('Todos los campos son requeridos');
        $scope.loading = false;
    }else {
      if (validar_email(correo.mail)) {
        console.log('entro');
        var d = correo
        enviarMail(d)
      }else {
          alertify.error('Ingrese un correo valido');
          $scope.loading = false;
      }
    }
  }

  function enviarMail(d){
      console.log(d);
      var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
         user: 'josehdez40@gmail.com',
         pass: 'homer213'
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
            from: '"Contacto de Horus"<josehdez40@gmail.com>',
            to: 'jcarlos.horus@gmail.com',
            subject: 'Contacto Horus Network',
            html: correo
        };

        transporter.sendMail(message, function(err) {
          if (!err) {
            console.log('Email enviado');
            alertify.success('Correo Enviado');
            $scope.correo = {}
            $scope.loading = false;
          } else
            console.log(err);
            alertify.error('Error al enviar el correo, intente mas tarde');
            $scope.loading = false;
        });
  }


}]);

    angular.module(MODULE_NAME)
    .directive('fileModel', ['$parse', function ($parse) {
        return {
           restrict: 'A',
           link: function(scope, element, attrs) {
              var model = $parse(attrs.fileModel);
              var modelSetter = model.assign;
              element.bind('change', function(){
                 scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                 });
              });
           }
        };
     }]);
