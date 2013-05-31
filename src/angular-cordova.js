'use strict';

angular.module('cordova', [])

  .service('$cordova', function($window, $q) {

    var cordova = this.instance = $window.cordova;

    this.install = function(platform) {
      var js = document.createElement('script');
      js.type = 'text/javascript';
      js.async = true;
      js.src = 'components/cordova/cordova.' + platform + '.js';
      var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(js, s);
    };

    this.exec = function(plugin, action, args) {
      var deferred = $q.defer();
      if(!cordova || ! cordova.exec) return;
      cordova.exec(function onSuccess(res) {
        deferred.resolve(res);
      }, function onError(err) {
        deferred.reject(err);
      }, plugin, action, args);
      return deferred.promise;
    };

    this.mock = function() {
      var deferred = $q.defer();
      return deferred.promise;
    }

  })

  .run(function($cordova) {

    $cordova.$deviceready = false;
    document.addEventListener('deviceready', function() {
      $cordova.$deviceready = true;
    }, false);

    var userAgent = navigator.userAgent.toLowerCase();

    if(/(ipad|iphone)/.test(userAgent)) {
      // $cordova.install('ios');
    } else {
    }

  });