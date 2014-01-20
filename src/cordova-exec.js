'use strict';

angular.module('mgcrea.ngCordova.exec', [])

  .provider('$cordova', function() {

    var options = this.options = {
      debug: false
    };

    this.$get = function($window, $document, $rootScope, $location, $q, $timeout) {

      var $cordova = {};
      $window.$cordova = $cordova;

      // Private vars

      var cordova = $window.cordova;
      var deferred = $q.defer();

      // Public methods

      $cordova.init = function() {
        $cordova.$ready = deferred.promise;
        $document.on('deviceready', onDeviceReady);
      };

      $cordova.exec = function(plugin, action, args) {
        return $cordova.$ready.then(function() {
          if(!$cordova.isReady()) return false;
          var deferred = $q.defer();
          cordova.exec(function onExecSuccess(res) {
            deferred.resolve(res);
          }, function onExecError(err) {
            deferred.reject(err);
          }, plugin, action, args || []);
          return deferred.promise;
        });
      };

      $cordova.handleOpenURL = function(scheme, callback) {
        $window.handleOpenURL = function(url) {
          $timeout(function() {
            $location.path(url.replace(scheme, '/'));
            if(angular.isFunction(callback)) callback.call(null, url);
          });
        };
      };

      $cordova.$openURL = function(url) {
        $window.open(url, '_system');
      };

      $cordova.isReady = function() {
        return !$cordova.$debug && $cordova.$device && $cordova.$device.available;
      };

      $cordova.destroy = function() {
        $document.off('deviceready', onDeviceReady);
        $cordova = null;
      };

      function onDeviceReady() {
        console.warn('onDeviceReady', $window.device);
        $cordova.$device = $window.device;
        deferred.resolve($window.device);
      }

      $cordova.init();
      return $cordova;

    };

  });

