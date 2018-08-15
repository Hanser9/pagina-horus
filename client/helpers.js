this.getProduccion = function() {
  return false;
}

this.getUrl = function() {
  return this.getProduccion() ? "https://app.gabssa.net/" + SISTEMA + "/" : "http://localhost:" + PUERTO;
}

this.getLocation = function() {
  return this.getProduccion() ? "/" + SISTEMA : "";
}

this.getNamespace = function() {
  return this.getProduccion() ? "" : "/" + SISTEMA + "/";
}

this.getUrlAcceso = function() {
  return this.getProduccion() ? "https://app.gabssa.net/acceso" : "https://app.gabssa.net/acceso";
}

this.initInterfaz = function() {
  $('.overlay').show();
  $('.overlay-back').show();

  $('#btn-menu').click(function() {
    if($('#menu').css('margin-left') == '-256px')
      $('#menu').animate({'margin-left':'0px'},400);
    else
      $('#menu').animate({'margin-left':'-256px'},400);
  });

  $('input[type="text"]').blur(function() {
    $('.cmb-select').slideUp(400);

    if(!$(this).hasClass('activado')) {
      $(this).removeClass('activado');
    }
  });

  $('body').on('focus', 'input[type="text"]', function() {
    if(!$(this).hasClass('activado')) {
      $(this).select();
      $(this).addClass('activado');
    }
  });

  $('body').on('click', 'input[type="text"]', function(e) {
    if(!$(this).hasClass('activado')) {
      $(this).select();
      $(this).addClass('activado');
    }
  });

  $('body').on('blur', 'input[type="text"]', function() {
    if(!$(this).hasClass('activado')) {
      $(this).removeClass('activado');
    }
  });

  $('body').on('focus', '.cmb-select-master', function(e) {
    var ancho = e.target.clientWidth;
    var alto = e.target.offsetTop + 32;
    $(e.target).siblings('.cmb-select').css('width', ancho + 'px');
    $(e.target).siblings('.cmb-select').css('top', alto + 'px');
    $(e.target).siblings('.cmb-select').slideDown(200);
  });

  $('body').on('click', function(e) {
    var blanco = $(e.target).attr('id');
    if(blanco != 'menu' && blanco != 'img-menu') {
      $('#menu').animate({'margin-left':'-256px'},400);
    }
  });

  $(document).keydown(function(e){
    if(e.which == 27){
      $('#menu').animate({'margin-left':'-256px'},400);
      //var scope = angular.element('.closing-button').scope();
      var scope = angular.element(document.querySelectorAll('.closing-button')).scope();
      scope.$root.$broadcast("ocultar_ver", {});
    }
  });

  $.fn.center = function () {
  	var arriba = $(window).scrollTop() + 64;
    this.css({ top: arriba + 'px' });
    $('.overlay-back').css({ height: '2500px'});
  	return this;
  }
}
