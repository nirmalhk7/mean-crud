angular.module('LoginService', []).factory('LoginService', ['$http','$window', function($http,$window) {

    //to create unique contact id
    var uid = 1;
    
    //contacts array to hold list of all contacts
    var contacts = [{
        id: 0,
        'name': 'Viral',
            'email': 'hello@gmail.com',
            'phone': '123-2343-44'
    }];
    
    //save method create a new contact if not already exists
    //else update the existing object
    let savefn = function (user) {
        $http.post('/api/users/login', user)
        .then(function(resp){
            if(resp.data.length)
            {
                $window.location.href="/dashboard";
            }
            console.log('RESPONSE',resp.data);
        });
        // if(resp.length)
        // {
        //     $window.location.href = '/dashboard';
        // }
        // else{
        //     alert('Login Incorrect!');
        // }
    };

    //simply search contacts list for given id
    //and returns the contact object if found
    let getfn = function (id) {
        for (i in contacts) {
            if (contacts[i].id == id) {
                return contacts[i];
            }
        }
    };

    //iterate through contacts list and delete 
    //contact if found
    let deletefn = function (id) {
        for (i in contacts) {
            if (contacts[i].id == id) {
                contacts.splice(i, 1);
            }
        }
    };
    //simply returns the contacts list
    let listfn = function () {
        return contacts;
    }
    let returnVal = {
        save: savefn,
        get: getfn,
        delete: deletefn,
        list: listfn
    }
    return returnVal;
}]);
