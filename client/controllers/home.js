require('../services/home');
var alertify = require('alertifyjs');

angular.module(MODULE_NAME)
.controller('homeCtrl', ['$scope', 'HomeService', '$timeout', function($scope, HomeService, $timeout) {
  var ctrl = this;
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
    var correo = $scope.correo
    if (correo.nombre === undefined || correo.mail === undefined || correo.tel === undefined || correo.mensaje === undefined) {
        alertify.error('Todos los campos son requeridos');
    }else {
      if (validar_email(correo.mail)) {
        var d = correo
        HomeService.enviarMail(d)
        .success(function(res){
          console.log(res);
          alertify.success('Correo Enviado');
          $scope.correo = {}
        })
      }else {
          alertify.error('Ingrese un correo valido');
      }
    }
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
