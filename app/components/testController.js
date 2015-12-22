(function(){
  'use strict';

  angular.module('photo-organizer', []).controller('testController', TestController);

  function TestController() {
    this.message = message;
  }
  var message = 'foooooooooo';

})();
