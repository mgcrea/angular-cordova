'use strict';

angular.module('mgcrea.ngCordova.notification', ['mgcrea.ngCordova.exec'])

  .provider('$notification', function() {

    var defaults = this.defaults = {
      alertTitle: 'Alert',
      alertMessage: '',
      alertButtonLabel: 'OK',
      confirmTitle: 'Confirm',
      confirmMessage: '',
      confirmButtonLabels: 'Cancel,OK',
      confirmSubmitButton: 2,
      promptTitle: 'Prompt',
      promptMessage: '',
      promptButtonLabels: 'Cancel,OK',
      promptSubmitButton: 2,
      vibrateTime: 1000,
      beepCount: 1
    };

    this.$get = function($window, $q, $cordova) {

      var $notification = {};
      $window.$notification = $notification;

      /**
       * Open a native alert dialog, with a customizable title and button text.
       *
       * @param {String} message              Message to print in the body of the alert
       * @param {String} title                Title of the alert dialog (default: Alert)
       * @param {String} buttonLabel          Label of the close button (default: OK)
       */
      $notification.alert = function(title, message, buttonLabel) {
        title = title || defaults.alertTitle;
        message = message || defaults.alertMessage;
        buttonLabel = buttonLabel || defaults.alertButtonLabel;
        if(!$cordova.isReady()) return $q.when($window.alert((title ? title + '\n' : '') + message));
        return $cordova.exec('Notification', 'alert', [message, title, buttonLabel]).then(function() { return true; });
      };

      /**
       * Open a native confirm dialog, with a customizable title and button text.
       * The result that the user selects is returned to the result callback.
       *
       * @param {String} message              Message to print in the body of the alert
       * @param {String} title                Title of the alert dialog (default: Confirm)
       * @param {Array} buttonLabels          Array of the labels of the buttons (default: ['OK', 'Cancel'])
       */
      $notification.confirm = function(title, message, buttonLabels, submitButton) {
        title = title || defaults.confirmTitle;
        message = message || defaults.confirmMessage;
        buttonLabels = buttonLabels || defaults.confirmButtonLabels;
        submitButton = submitButton || defaults.confirmSubmitButton;
        if(!$cordova.isReady()) return $q.when($window.confirm((title ? title + '\n' : '') + message));
        if(angular.isString(buttonLabels)) buttonLabels = buttonLabels.split(',');
        return $cordova.exec('Notification', 'confirm', [message, title, buttonLabels])
        .then(function(buttonIndex) {
          return buttonIndex === submitButton;
        });
      };

      /**
       * Open a native prompt dialog, with a customizable title and button text.
       * The following results are returned to the result callback:
       *  buttonIndex     Index number of the button selected.
       *  input1          The text entered in the prompt dialog box.
       *
       * @param {String} message              Dialog message to display (default: 'Prompt message')
       * @param {String} title                Title of the dialog (default: 'Prompt')
       * @param {Array} buttonLabels          Array of strings for the button labels (default: ['OK','Cancel'])
       */
      $notification.prompt = function(title, message, buttonLabels, submitButton) {
        title = title || defaults.promptTitle;
        message = message || defaults.promptMessage;
        console.warn(buttonLabels, defaults.promptButtonLabels);
        buttonLabels = buttonLabels || defaults.promptButtonLabels;
        console.warn(buttonLabels);
        submitButton = submitButton || defaults.promptSubmitButton;
        if(!$cordova.isReady()) return $q.when($window.prompt((title ? title + '\n' : '') + message));
        if(angular.isString(buttonLabels)) buttonLabels = buttonLabels.split(',');
        return $cordova.exec('Notification', 'prompt', [message, title, buttonLabels])
        .then(function(res) {
          if(!res || res.buttonIndex !== submitButton) return null;
          return res.input1;
        });
      };

      /**
       * Causes the device to vibrate.
       *
       * @param {Integer} time       The number of milliseconds to vibrate for.
       */
      $notification.vibrate = function(time) {
        return $cordova.exec('Notification', 'vibrate', [time || defaults.vibrateTime]);
      };

      /**
       * Causes the device to beep.
       * On Android, the default notification ringtone is played "count" times.
       *
       * @param {Integer} count       The number of beeps.
       */
      $notification.beep = function(count) {
        return $cordova.exec('Notification', 'beep', [count || defaults.beepCount]);
      };

      return $notification;

    };

  });
