'use strict';

angular.module('cordova.contacts', ['cordova'])

  .service('$contacts', function(console, $cordova, $window, $q, $timeout) {

    var cordova = $cordova.instance;
    var contacts = navigator.contacts;
    var contactGroups = window.plugins && window.plugins.contactGroups;

    this.save = function(contact) {
      console.warn('$contacts.save', contact);

      var deviceContact = contacts.create(contact);
      var deferred = $q.defer();

      // Mock
      if(!angular.$deviceready) {
        console.warn('!angular.$deviceready');
        $timeout(function() {
          deferred.resolve(contact);
        });
        return deferred.promise;
      }

      deviceContact.save(function onSaveSuccess(contact) {
        console.warn('$contacts.save >', contact);
        $timeout(function() {
          deferred.resolve(contact);
        });
      }, function onSaveError(err) {
        console.error('onSaveError!', arguments);
        $timeout(function() {
          deferred.reject(err);
        });
      });

      return deferred.promise;

    };

    this.find = function(options) {
      console.warn('$contacts.find', options);

      var fields = options.fields || ['id', 'displayName'];
      delete options.fields;

      var deferred = $q.defer();

      // Mock
      if(!angular.$deviceready) {
        console.warn('!angular.$deviceready');
        $timeout(function() {
          deferred.resolve([]);
        });
        return deferred.promise;
      }

      contactGroups.find(fields, options, function onFindSuccess(contacts) {
        console.warn('$contacts.find >', contacts);
        $timeout(function() {
          deferred.resolve(contacts);
        });
      }, function onFindError(err) {
        console.error('onFindError!', arguments);
        $timeout(function() {
          deferred.reject(err);
        });
      });

      return deferred.promise;

    };


  });
