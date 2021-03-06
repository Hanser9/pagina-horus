require('../services/home');
var alertify = require('alertifyjs');

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
        HomeService.enviarMail(d)
        .success(function(res){
          console.log(res);
          alertify.success('Correo Enviado');
          $scope.correo = {}
          $scope.loading = false;
        })
      }else {
          alertify.error('Ingrese un correo valido');
          $scope.loading = false;
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
