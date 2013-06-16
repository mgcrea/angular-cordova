'use strict';

angular.module('cordova.pushNotification', ['cordova'])

  .service('$pushNotification', function($cordova, $window, $q) {

    // Register for push notifications and retreive a deviceToken
    this.registerDevice = function(options) {
      if(!options) options = {};
      return $cordova.exec('PushNotification', 'registerDevice', [options]);
    };

    // Retreive pending notification received while the application is in background or at launch
    this.getPendingNotifications = function() {
      return $cordova.exec('PushNotification', 'getPendingNotifications', []);
    };

    // Get a detailed status of remoteNotifications
    this.getRemoteNotificationStatus = function() {
      return $cordova.exec('PushNotification', 'getRemoteNotificationStatus', []);
    };

    // Get the current value of the application badge number
    this.getApplicationIconBadgeNumber = function() {
      return $cordova.exec('PushNotification', 'getApplicationIconBadgeNumber', []);
    };

    // Set the application icon badge
    this.setApplicationIconBadgeNumber = function(value) {
      return $cordova.exec('PushNotification', 'setApplicationIconBadgeNumber', [value || 0]);
    };

    // Clear all notifications from the notification center
    this.cancelAllLocalNotifications = function() {
      return $cordova.exec('PushNotification', 'cancelAllLocalNotifications', []);
    };

    // Call this to retreive the iOS6 device unique id
    this.getDeviceUniqueIdentifier = function() {
      return $cordova.exec('PushNotification', 'getDeviceUniqueIdentifier', []);
    };

    this.notificationCallback = function(notification) {
      var ev = document.createEvent('HTMLEvents');
      ev.notification = notification;
      ev.initEvent('push-notification', true, true, arguments);
      document.dispatchEvent(ev);
    };

  })

  .run(function($cordova, $pushNotification) {

    $cordova.instance.addConstructor(function() {
      if(!window.plugins) window.plugins = {};
      window.plugins.pushNotification = $pushNotification;
    });

  });
