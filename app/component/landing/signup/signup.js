'use strict';

module.exports = {
  template: require('./signup.html'),
  controller: ['$log', '$location', 'authService', SignupController],
  controllerAs: 'signupCtrl'
};

function SignupController($log, $location, authService) {
  $log.debug('SignupController');

  this.signup = function(user) {
    $log.debug('signupCtrl.signup()');

    authService.signup(user)
    .then( () => {
      $location.url('/home');
    });
  };
}
