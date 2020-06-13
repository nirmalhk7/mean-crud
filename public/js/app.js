let app=angular.module('mean-crud', ['ngRoute', 'appRoutes', 'MainCtrl','LoginCtrl']);

app.controller('LoginCtrl2',function($scope){
    $scope.first=1;
    $scope.second=2;
    
})
// Used to associate AngularJS app to HTML document