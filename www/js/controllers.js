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
})

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
