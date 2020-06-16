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
               if(response.data[0].role=='boss') 
                    $window.location.href = '/dashboard';
                else
                    $window.location.href = '/profile';
            }
            else{
                alert('Login Incorrect!');
            }
        });
    }
}]);


root_app.controller('ProfileController',['$scope','LoginService','$window','$cookies','$route',function($scope,LoginService,$window,$cookies,$route){
    if(!$cookies.get('email'))
    {
        alert('Log In to Access')
        window.location.href="/"
    }
    $scope.logout = function(){
        console.log("LOGGING OUT");
        $cookies.remove('email');
        $cookies.remove('id');
        $cookies.remove('role');
        window.location.href="/"
    }
    LoginService.getUserDetails('/api/users',{"email":$cookies.get('email')}).then(response=>{
        $scope.user=response.data[0];
        $scope.title=$scope.user.name;
    })
    LoginService.getAppraisalDetails('/api/appraisals',{"revieweeEmail":$cookies.get('email')}).then(ans=>{
        $scope.appraisal=ans.data[0]
    })
}]);


root_app.controller('ReviewController',['$scope','LoginService','$window','$cookies','$route',function($scope,LoginService,$window,$cookies,$route){
    if(!$cookies.get('email'))
    {
        alert('Log In to Access')
        window.location.href="/"
    }
    $scope.logout = function(){
        console.log("LOGGING OUT");
        $cookies.remove('email');
        $cookies.remove('id');
        $cookies.remove('role');
        window.location.href="/"
    }
    $scope.role = $cookies.get('role')
    $scope.rating = [1,2,3,4,5];
    $scope.userid = $route.current.params.userid;
    LoginService.getUserDetails('/api/users',{"_id":$scope.userid}).then(response=>{
        $scope.user=response.data[0]
    }).then(()=>{
        if($scope.user.commentexist!=false){
            LoginService.getAppraisalDetails('/api/appraisals',{"authorEmail":$cookies.get('email'),"revieweeEmail":$scope.user.email}).then(ans=>{
                $scope.appraisal=ans.data[0]
            })
            $scope.dataexist=true;
        }
    })
    $scope.title = $scope.commentexist==false ? "Add a Review": "Update a Review"
    $scope.submitAppraisal = function (){
        let objx={"_id":$scope.appraisal._id,"rating":$scope.appraisal.rating,"subject":$scope.appraisal.subject,"comments":$scope.appraisal.comments,"authorEmail":$cookies.get('email'),"revieweeEmail":$scope.user.email};
        console.log("CHECK",$scope.commentexist);
        if($scope.commentexist==false || !$scope.commentexist)
        {
            console.log("{efdv4redv")
            LoginService.submitAppraisal(objx,'/api/appraisals').then(response=>{
                $window.location.href="/dashboard";
            })
        }
        else{
            console.log(objx)
            console.log("[[[efdv4redv")
            LoginService.updateAppraisal(objx,'/api/appraisals').then(response=>{
                $window.location.href="/dashboard";
            })
        }
    }
    $scope.deleteAppraisal = function (){
        console.log($scope.appraisal)
        LoginService.delete({params:{_id:$scope.appraisal._id}},'/api/appraisals').then(response=>{
            $window.location.href="/dashboard";
        })
    }

}]);



root_app.controller('DashboardController',['$scope','LoginService','$window','$cookies',function($scope,LoginService,window,$cookies){
    if(!$cookies.get('email'))
    {
        alert('Log In to Access')
        window.location.href="/"
    }
    $scope.logout = function(){
        console.log("LOGGING OUT");
        $cookies.remove('email');
        $cookies.remove('id');
        $cookies.remove('role');
        window.location.href="/"
    }
    $scope.username = $cookies.get('email');
    LoginService.getEmployees('/api/users/',{"boss_email":$cookies.get('email')}).then(response=>{
        $scope.employees=response.data;
    });
    LoginService.getAppraisals('/api/appraisals',{"authorEmail":$cookies.get('email')}).then(response=>{
        $scope.appraisals=response.data;
        console.log("ER",response.data)
    });
    $scope.title = "Employee Appraisal System"
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
        .when('/profile',{
            templateUrl: 'views/Profile.html',
            controller: 'ProfileController'
        })
        .when('/reviews/:userid',{
            templateUrl: 'views/Review.html',
            controller: 'ReviewController',
        })
        .when('/404',
        {
            templateUrl: 'views/404.html'
        }).otherwise({redirectTo: '/404'});
    $locationProvider.html5Mode(true);
}]);


// Used to associate AngularJS root_app to HTML document