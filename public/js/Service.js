angular.module('LoginService', []).factory('LoginService', ['$http','$window', function($http,$window) {
    
    //save method create a new contact if not already exists
    //else update the existing object
    let postfn = function (user_inp,url_endpt) {
        return $http.post(url_endpt, user_inp)
    };

    let returnVal = {
        verify: postfn
    }
    return returnVal;
}]);
