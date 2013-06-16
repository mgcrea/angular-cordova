'use strict';

angular.module('cordova', [])

  .service('$cordova', function($window, $rootScope, $q, $timeout) {

    this.$cordova = $window.cordova || {};
    this.$device = $window.device;
    this.isReady = function() {
      return this.$device && this.$device.available;
    };

    var deferredReady = $q.defer();
    this.$ready = deferredReady.promise;
    document.addEventListener('deviceready', function() {
      deferredReady.resolve($window.device);
    });
    setTimeout(function() {
      deferredReady.resolve($window.device);
    }, 5000);

    this.install = function(platform) {
      var js = document.createElement('script');
      js.type = 'text/javascript';
      js.async = true;
      js.src = 'components/cordova/cordova.' + platform + '.js';
      var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(js, s);
    };

    this.exec = function(plugin, action, args) {
      var self;
      return this.$ready.then(function() {
        if(!self.isReady()) return false;
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
      });
    };

    this.mock = function(resolve, delay) {
      var deferred = $q.defer();
      $timeout(function() {
        deferred.resolve(resolve);
      }, delay || 0);
      return deferred.promise;
    };

  });