// If you want to define an object shape you can also declare it like this:
// type Autheticatable = {...}
var employee;
employee = {
    email: 'email@example.com',
    password: 'test1',
    login: function () {
        console.log('User logged in');
    },
    logout: function () {
        console.log('User logged out');
    },
    role: 'user'
};
var AuthenticatableUser = /** @class */ (function () {
    function AuthenticatableUser(email, password, role) {
        this.email = email;
        this.password = password;
        this.role = role;
    }
    AuthenticatableUser.prototype.login = function () {
        console.log("".concat(this.email, " logged in as ").concat(this.role));
    };
    AuthenticatableUser.prototype.logout = function () {
        console.log("".concat(this.email, " logged out"));
    };
    return AuthenticatableUser;
}());
// Say this function exists somewhere else in your code 
function authenticate(user) { } // You could do this 
function authenticate2(user) { } // Or this
