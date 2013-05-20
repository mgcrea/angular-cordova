
// karma start test/karma.conf.js --browsers ios-browser
// testem -f test/testem-cordova.json --browsers ios

describe('app', function() {

  var require = cordova.require;

  var contacts = require('cordova/plugin/contacts');
  // var contacts = navigator.contacts;

  beforeEach(function() {
    // require('cordova/channel').onNativeReady.fire();
    // cordova.require('cordova/channel').onPluginsReady.fire();
    // window._nativeReady = true;
    // helper.trigger(window.document, 'deviceready');
  });

  afterEach(function() {

  });

  // describe('initialize', function(done) {
  //   it('should geolocation.getCurrentPosition', function(done) {
  //     navigator.geolocation.getCurrentPosition(function onSuccess(r) {
  //       expect(r.coords).toBeDefined();
  //       alert(JSON.stringify(r));
  //       done();
  //     }, function onError() {
  //       alert('error');
  //       done();
  //     });
  //   });
  // });

  describe('contact', function(done) {
    it('should contacts.find', function(done) {
      expect(contacts).toBeDefined();

      setTimeout(function() {
        // var myContact = navigator.contacts.create({"displayName": "Test User"});
        contacts.find(["name", "phoneNumbers", "emails"], function onSuccess(contacts) {
          console.log('success', contacts.length);
          // alert('Found ' + contacts.length + ' contacts.');
          expect(contacts.length).toBe(6);
          // alert(JSON.stringify(r));
          done();
        }, function onError(err) {
          expect(err).toBe(null);
          done();
        }, {multiple: true});

      }, 0);

    });

  });

});
