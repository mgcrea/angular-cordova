'use strict';

angular.module('cordova', [])

  .service('$cordova', function($window, $rootScope, $q, $timeout) {

    this.$cordova = $window.cordova || {};
    this.$device = $window.device || {available: false};

    this.install = function(platform) {
      var js = document.createElement('script');
      js.type = 'text/javascript';
      js.async = true;
      js.src = 'components/cordova/cordova.' + platform + '.js';
      var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(js, s);
    };

    this.splashscreen = {
      show: function() {
        navigator.splashscreen && navigator.splashscreen.show();
      },
      hide: function() {
        navigator.splashscreen && navigator.splashscreen.hide();
      }
    };

    this.isReady = function() {
      return !!this.$device.available;
    };

    this.exec = function(plugin, action, args) {
      if(!this.isReady()) return $q.when(false);
      var deferred = $q.defer();
      this.$cordova.exec(function onSuccess(res) {
        $rootScope.$apply(function() {
          deferred.resolve(res);
        });
      }, function onError(err) {
        $rootScope.$apply(function() {
          deferred.reject(err);
        });
      }, plugin, action, args || []);
      return deferred.promise;
    };

    this.mock = function(resolve, delay) {
      var deferred = $q.defer();
      $timeout(function() {
        deferred.resolve(resolve);
      }, delay || 0);
      return deferred.promise;
    };

  });