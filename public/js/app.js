let root_app=angular.module('mean-crud', ['ngRoute','LoginService']);

root_app.factory('state', function () {

    var data = {
        id: 0,
        email: "",
        role: "",
        redirect : ""
    };

    return {
        getId: function () {
            return data.id;
        },
        getEmail: function () {
            return data.email;
        },
        getRole: function () {
            return data.role;
        },
        getAll: function (){
            return data
        },
        setAll: function (objx) {
            data.id = objx._id;
            data.email = objx.email;
            data.role = objx.role;
        }
    };
});

root_app.controller('LoginController',['$scope','LoginService','$window','state',function($scope,LoginService,$window,state){
    $scope.loginVerify = function () {
        $event.preventDefault();
        LoginService.verify($scope.user,'api/users/login').then(response=>{
            if(response.data.length)
            {
                console.log('RESPONSE1',response.data);
                state.setAll(response.data[0],'/dashboard',$window)
                console.log('STATE',state.getAll());
               // alert('HI')
                $window.location.href = '/dashboard';
            }
            else{
                alert('Login Incorrect!');
            }
        });

        $scope.user = {};
    }
    console.log("LoginController",state.getAll())
}]);

root_app.controller('DashboardController',['$scope','state','LoginService','$window',function($scope,state,LoginService,window){
    console.log("DashboardController",state.getAll());
    if(state.getEmail()=="")
    {
        alert('Log In to Access')
      //  window.location.href="/"
    }
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
        .when('/404',
        {
            templateUrl: 'views/404.html'
        }).otherwise({redirectTo: '/404'});
    $locationProvider.html5Mode(true);
}]);


// Used to associate AngularJS root_app to HTML document