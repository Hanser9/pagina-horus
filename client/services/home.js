// var url = helpers.getUrl();

angular.module(MODULE_NAME)
.service('HomeService', ['$http', function($http) {
  var url = "https://hanserdev.site/horus";
  var urlBase = url + '/home';

  this.enviarMail = function(d) {
    return $http.post(urlBase + '/enviar-correo' , d);
  }
}]);
