angular.module('appRoutes', []).config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
        // home page
        .when('/', {
            templateUrl: 'views/Login.html',
            controller: 'LoginController'
        })
        .when('/dashboard',{
            templateUrl: 'views/Dashboard.html',
            controller: 'DashboardController'
        })
        .when('/404',
        {
            templateUrl: 'views/404.html'
        }).otherwise({redirectTo: '/404'});
    $locationProvider.html5Mode(true);
}]);
