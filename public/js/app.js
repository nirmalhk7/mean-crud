let root_app=angular.module('mean-crud', ['ngRoute','LoginService','ngCookies']);

root_app.controller('LoginController',['$scope','LoginService','$window','$cookies',function($scope,LoginService,$window,$cookies){
    if($cookies.get('email'))
    {
        window.location.href="/dashboard"
    }
    $scope.loginVerify = function ($event) {
        event.preventDefault();
        LoginService.verify($scope.user,'api/users/login').then(response=>{
            if(response.data.length)
            {
                console.log('RESPONSE1',response.data);
                $cookies.put("email", response.data[0].email);
                $cookies.put("role", response.data[0].role);
                $cookies.put("id", response.data[0]._id);
                
               // alert('HI')
                $window.location.href = '/dashboard';
            }
            else{
                alert('Login Incorrect!');
            }
        });
    }
}]);
root_app.controller('ReviewController',['$scope','LoginService','$window','$cookies',function($scope,LoginService,$window,$cookies){
    $scope.title = "Review"
}]);
root_app.controller('DashboardController',['$scope','LoginService','$window','$cookies',function($scope,LoginService,window,$cookies){
    if(!$cookies.get('email'))
    {
        alert('Log In to Access')
        window.location.href="/"
    }
    $scope.logout = function(){
        $cookies.remove('email');
        $cookies.remove('id');
        $cookies.remove('role');
        window.location.href="/"
    }
    $scope.username = $cookies.get('email');
    LoginService.getEmployees('/api/users/',{"boss_email":$cookies.get('email')}).then(response=>{
        $scope.employees=response.data;
    });
    LoginService.getAppraisals('/api/appraisals',{"author":$cookies.get('email')}).then(response=>{
        $scope.appraisals=response.data;
    })
    $scope.title = "Employee Appraisal Mgmt System"
}]);
root_app.config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) {
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
        .when('/reviews/:reviewid',{
            templateUrl: 'views/Review.html',
            controller: 'DashboardController'
        })
        .when('/404',
        {
            templateUrl: 'views/404.html'
        }).otherwise({redirectTo: '/404'});
    $locationProvider.html5Mode(true);
}]);


// Used to associate AngularJS root_app to HTML document