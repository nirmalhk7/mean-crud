let root_app=angular.module('mean-crud', ['ngRoute','HTTPService','ngCookies']);

root_app.controller('LoginController',['$scope','HTTPService','$window','$cookies',function($scope,HTTPService,$window,$cookies){
    if($cookies.get('email'))
    {
        window.location.href="/dashboard"
    }
    $scope.loginVerify = function ($event) {
        event.preventDefault();
        HTTPService.verify($scope.user,'api/users/login').then(response=>{
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

root_app.controller('SignUpController',['$scope','HTTPService','$window','$cookies',function($scope,HTTPService,$window,$cookies){
    if($cookies.get('email'))
    {
        window.location.href="/dashboard"
    }
    $scope.rating=["boss","employee"]
    $scope.SignUpVerify = function ($event) {
        event.preventDefault();
        HTTPService.signup($scope.user,'api/users/signup').then(response=>{
                console.log('RESPONSE1',response.data);
                $cookies.put("email", response.data.email);
                $cookies.put("role", response.data.role);
                $cookies.put("id", response.data._id);
               // alert('HI')
               if(response.data.role=='boss') 
                    $window.location.href = '/dashboard';
                else
                    $window.location.href = '/profile';
        });
    }
}]);


root_app.controller('ProfileController',['$scope','HTTPService','$window','$cookies','$route',function($scope,HTTPService,$window,$cookies,$route){
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
    HTTPService.getUserDetails('/api/users',{"email":$cookies.get('email')}).then(response=>{
        $scope.user=response.data[0];
        $scope.title=$scope.user.name;
    })
    HTTPService.getAppraisalDetails('/api/appraisals',{"revieweeEmail":$cookies.get('email')}).then(ans=>{
        $scope.appraisal=ans.data[0]
    })
}]);


root_app.controller('ReviewController',['$scope','HTTPService','$window','$cookies','$route',function($scope,HTTPService,$window,$cookies,$route){
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
    HTTPService.getUserDetails('/api/users',{"_id":$scope.userid}).then(response=>{
        $scope.user=response.data[0]
    }).then(()=>{
        if($scope.user.commentexist!=false){
            HTTPService.getAppraisalDetails('/api/appraisals',{"authorEmail":$cookies.get('email'),"revieweeEmail":$scope.user.email}).then(ans=>{
                $scope.appraisal=ans.data[0]
            })
            $scope.dataexist=true;
        }
    })
    $scope.title = $scope.commentexist==false || !$scope.commentexist ? "Add a Review": "Update a Review"
    $scope.submitAppraisal = function (){
        let objx={"_id":$scope.appraisal._id,"rating":$scope.appraisal.rating,"subject":$scope.appraisal.subject,"comments":$scope.appraisal.comments,"authorEmail":$cookies.get('email'),"revieweeEmail":$scope.user.email};
        console.log("CHECK",$scope.commentexist);
        if($scope.commentexist==false || $scope.commentexist)
        {
            console.log("{efdv4redv")
            HTTPService.submitAppraisal(objx,'/api/appraisals').then(response=>{
                $window.location.href="/dashboard";
            })
        }
        else{
            console.log(objx)
            console.log("[[[efdv4redv")
            HTTPService.updateAppraisal(objx,'/api/appraisals').then(response=>{
                $window.location.href="/dashboard";
            })
        }
    }
    $scope.deleteAppraisal = function (){
        console.log($scope.appraisal)
        HTTPService.delete({params:{_id:$scope.appraisal._id}},'/api/appraisals').then(response=>{
            $window.location.href="/dashboard";
        })
    }

}]);



root_app.controller('DashboardController',['$scope','HTTPService','$window','$cookies',function($scope,HTTPService,window,$cookies){
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
    HTTPService.getEmployees('/api/users/',{"boss_email":$cookies.get('email')}).then(response=>{
        $scope.employees=response.data;
    });
    HTTPService.getAppraisals('/api/appraisals',{"authorEmail":$cookies.get('email')}).then(response=>{
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
        .when('/signup',{
            templateUrl: 'views/SignUp.html',
            controller: 'SignUpController'
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