angular.module('LoginService', []).factory('LoginService', ['$http','$window', function($http,$window) {
    
    //save method create a new contact if not already exists
    //else update the existing object
    let postfn = function (user_inp,url_endpt) {
        return $http.post(url_endpt, user_inp)
    };
    let getfn = function(url_endpt,search_params){
        console.log("searching",search_params);
        return $http.get(url_endpt,{params:search_params})
    }
    let returnVal = {
        verify: postfn,
        getEmployees: getfn,
        getAppraisals: getfn,
    }
    return returnVal;
}]);
