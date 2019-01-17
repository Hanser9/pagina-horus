// var url = helpers.getUrl();

angular.module(MODULE_NAME)
.service('HomeService', ['$http', function($http) {
  // var url = "http://www.horusnetwork.online";
  var url = "http://localhost:3003";
  var urlBase = url + '/home';

  this.enviarMail = function(d) {
    return $http.post(urlBase + '/enviar-correo' , d);
  }
}]);
