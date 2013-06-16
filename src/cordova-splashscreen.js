'use strict';

angular.module('cordova.splashscreen', ['cordova'])

  .service('$splashscreen', function($cordova) {

    /**
     * Show the native splashscreen
     */
    this.show = function() {
      return $cordova.exec('SplashScreen', 'show', []);
    };

    /**
     * Hide the native splashscreen
     */
    this.hide = function() {
      return $cordova.exec('SplashScreen', 'hide', []);
    };

  });