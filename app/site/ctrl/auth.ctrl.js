// login function

app.controller('AuthCtrl', AuthCtrl);

function AuthCtrl($state, api){
    var ctrl = this;
    ctrl.$state = $state;
    ctrl.api = api;
    ctrl.password;
    ctrl.email;
    ctrl.auth_button = 'Continue';


    if(localStorage.authToken){
        ctrl.$state.go('auth');
    }    
}

AuthCtrl.prototype.login = function(){
    var ctrl = this;

    var payload = {
        email:ctrl.email,
        password:ctrl.password
    }
    ctrl.auth_btn = "Authorizing";
    //make api call
    ctrl.api.request('/users/login',payload,'POST')
    .then(function(response){
        console.log(response);
        //successfull responseva
        if(response.status == 200){
           ctrl.auth_btn = "Success";

       if (response.data.user != null){
           ctrl.$state.go('admin');
           }
       }

       else{
           ctrl.auth_btn = 'Invalid Password';
       }

    })
    .catch(function(err) {
        console.log(err);
    })
}