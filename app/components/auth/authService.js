authServise.$inject = ['$http', '$window', '$location', '$state', 'storageService']
export default function authServise($http, $window, $location, $state, storage) {
  var auth = {};

  auth.isLoggedIn = function() {
    var user = storage.getUser();
    if (user && user != 'undefined') {
      return true;
    } else {
      return false;
    }
  }

  auth.logFacebook = () => {

  }

  auth.register = function(user) {
    return $http.post('/register', user).then(function(success) {
      storage.saveUser(success.data.user)
      $state.go('home')
    }, function(error) {
      console.log(error)
    });
  };

  auth.logIn = function(user) {
    return $http.post('/login', user).then(function(success) {
      storage.saveUser(success.data.user)
      $state.go('home')
    });
  };

  auth.logOut = function() {
    storage.removeItem(storage.localStorageUserKey)
    $location.path('/home')
  };

  return auth;
}
