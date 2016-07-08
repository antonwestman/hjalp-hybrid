angular.module('hjalp-hybrid.controllers', [])

.controller('LoginCtrl', function($scope, $state, $ionicPopup, $auth, $ionicHistory, $ionicLoading) {
  $scope.data = {};

  $scope.$on('auth:registration-email-success', function(ev, message) {
      alert("A registration email was sent to " + message.email);
  });

  $scope.$on('auth:invalid', function(ev, message) {
    $state.go('login');
  });

  $scope.login = function(data){
    $ionicLoading.show({
      template: 'Loading...'
    });
    $auth.submitLogin({email: data.username, password: data.password})
      .then(function(resp) {
        $ionicHistory.nextViewOptions({
          disableAnimate: true,
          disableBack: true
        });
        $ionicLoading.hide();
        $state.go('tab.dash')
      })
      .catch(function(resp) {
        $ionicLoading.hide();
        var alertPopup = $ionicPopup.alert({
          title: "Login failed!",
          template: "Please check your credentials!"
        });
      });
  };
  $scope.signUp = function(data){
    $auth.submitRegistration({email: data.username, password: data.password, password_confirmation: data.password})
      .then(function(resp) {
        $ionicHistory.nextViewOptions({
          disableAnimate: true,
          disableBack: true
        });
        $state.go('start')
      })
      .catch(function(resp) {
        var alertPopup = $ionicPopup.alert({
          title: "Sign up failed!",
          template: resp.data.errors.full_messages
        });
      });
  };
})

.controller('MainController', function($auth, user, $scope) {
  $scope.user = user;
})

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, $state, $timeout, $ionicScrollDelegate, MessageService) {

  $scope.messages = []


  loadMessages = function(){
    MessageService.getMessages($scope.user.id).then(function(resp){
      $scope.messages = resp;
    })
  }
  setInterval( loadMessages, 30000 );
  loadMessages();


  $scope.hideTime = true;

  var isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

  // For ionic view to work. Remove on build
  if (isIOS) {
    cordova.plugins.Keyboard.disableScroll(true);
  }

  $scope.sendMessage = function(){
    message = {userId: $scope.user.id, createdAt: new Date(), text: $scope.data.message}
    $scope.messages.push(message);
    delete $scope.data.message;
    MessageService.sendMessage(message).then(function(resp){
      $ionicScrollDelegate.scrollTop(true);
    });
  }

  $scope.inputUp = function() {
    if (isIOS) $scope.data.keyboardHeight = 216;
    $timeout(function() {
      $ionicScrollDelegate.scrollBottom(true);
    }, 300);

  };

  $scope.inputDown = function() {
    if (isIOS) $scope.data.keyboardHeight = 0;
    $ionicScrollDelegate.resize();
  };

  $scope.closeKeyboard = function() {
    if (isIOS) cordova.plugins.Keyboard.close();
  };


  $scope.data = {};
  $scope.myId = $scope.user.id;
})

.controller('PlacesCtrl', function($scope, Restangular) {
  Restangular.all('food_places').getList().then(function(response){
    $scope.places = response.data
  })
});
