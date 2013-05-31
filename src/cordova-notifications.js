'use strict';

angular.module('cordova.notification', ['cordova'])

  .service('$notification', function($cordova, $q) {

    /**
     * Open a native alert dialog, with a customizable title and button text.
     *
     * @param {String} message              Message to print in the body of the alert
     * @param {String} title                Title of the alert dialog (default: Alert)
     * @param {String} buttonLabel          Label of the close button (default: OK)
     */
    this.alert = function(message, title, buttonLabel) {
      return $cordova.exec('Notification', 'alert', [message || '', title || 'Alert', buttonLabel || 'OK']);
    };

    /**
     * Open a native confirm dialog, with a customizable title and button text.
     * The result that the user selects is returned to the result callback.
     *
     * @param {String} message              Message to print in the body of the alert
     * @param {String} title                Title of the alert dialog (default: Confirm)
     * @param {Array} buttonLabels          Array of the labels of the buttons (default: ['OK', 'Cancel'])
     */
    this.confirm = function(message, title, buttonLabels) {
      return $cordova.exec('Notification', 'confirm', [message || '', title || 'Confirm', buttonLabels || ['OK', 'Cancel']]);
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
    this.prompt = function(message, title, buttonLabels) {
      return $cordova.exec('Notification', 'prompt', [message || '', title || 'Prompt', buttonLabels || ['OK', 'Cancel']]);
    };

    /**
     * Causes the device to vibrate.
     *
     * @param {Integer} mills       The number of milliseconds to vibrate for.
     */
    this.vibrate = function(mills) {
      return $cordova.exec('Notification', 'vibrate', [mills]);
    };

    /**
     * Causes the device to beep.
     * On Android, the default notification ringtone is played "count" times.
     *
     * @param {Integer} count       The number of beeps.
     */
    this.beep = function(count) {
      return $cordova.exec('Notification', 'beep', [count]);
    };

  });