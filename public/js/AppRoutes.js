angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/Home.html',
            controller: 'MainController'
        })
        .when('/login', {
            templateUrl: 'views/Nerd.html',
            controller: 'LoginController'
         });
    $locationProvider.html5Mode(true);

}]);
