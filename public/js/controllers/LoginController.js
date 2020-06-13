
angular.module('LoginController', []).controller('LoginController', function($scope,LoginService) {
    $scope.contacts = LoginService.list();
    $scope.tagline = 'Welcome to Student section!';
    $scope.loginVerify = function () {
        LoginService.save($scope.user);
        $scope.user = {};
    }
});
