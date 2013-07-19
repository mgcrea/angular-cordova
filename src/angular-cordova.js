'use strict';

angular.module('cordova', [])

  .service('$cordova', function($window, $rootScope, $location, $q, $timeout) {

    var self = this;
    this.cordova = $window.cordova || {};
    this.device = $window.device;

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

    this.isReady = function() {
      return this.device && this.device.available;
    };

    this.exec = function(plugin, action, args) {
      return $q.when(this.$ready, function() {
        if(!self.isReady()) return false;
        var deferred = $q.defer();
        self.cordova.exec(function onSuccess(res) {
          $timeout(function() {
            deferred.resolve(res);
          });
        }, function onError(err) {
          $timeout(function() {
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

    this.registerPlugin = function(name, plugin) {
      if(!angular.isFunction(this.cordova.addConstructor)) return false;
      this.cordova.addConstructor(function() {
        if(!window.plugins) window.plugins = {};
        window.plugins[name] = plugin;
      });
    };

    this.handleOpenURL = function(scheme, callback) {
      $window.handleOpenURL = function(url) {
        $timeout(function() {
          $location.path(url.replace(scheme, '/'));
          if(angular.isFunction(callback)) callback.call(null, url);
        });
      };
    };

  });