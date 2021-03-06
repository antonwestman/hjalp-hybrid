// Ionic hjalp-hybrid App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'hjalp-hybrid' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'hjalp-hybrid.services' is found in services.js
// 'hjalp-hybrid.controllers' is found in controllers.js
angular.module('hjalp-hybrid', ['ionic','ionic.service.core', 'hjalp-hybrid.controllers', 'hjalp-hybrid.services', 'ng-token-auth', 'restangular'])

.config(function($authProvider) {
  $authProvider.configure({
    apiUrl: 'http://hjalp.herokuapp.com',
    confirmationSuccessUrl: 'http://hjalp.herokuapp.com'
    // apiUrl:                 'http://hjalp.com:3000',
    // confirmationSuccessUrl: 'http://hjalp.com:3000',
  });
})

.config(function(RestangularProvider) {
  RestangularProvider.setBaseUrl('http://hjalp.herokuapp.com');
  // RestangularProvider.setBaseUrl('http://hjalp.com:3000');
  RestangularProvider.setFullResponse(true);
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('start',{
    url: '/',
    cahche: false,
    templateUrl: 'templates/start.html',
  })

  .state('login', {
    url: '/login',
    cache: false,
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })
  .state('register', {
    url: '/register',
    cache: false,
    templateUrl: 'templates/register.html',
    controller: 'LoginCtrl'
  })

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    controller: "MainController",
    resolve: {
      user: function($auth) {
        return $auth.validateUser().then(function(user){
          return user;
        });
      }
    }
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })

  .state('tab.places', {
    url: '/places',
    views: {
      'tab-places': {
        templateUrl: 'templates/tab-places.html',
        controller: 'PlacesCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
