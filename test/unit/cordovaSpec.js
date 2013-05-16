
describe('app', function() {

  var require = cordova.require;

  var contacts = cordova.require('cordova/plugin/contacts');

  beforeEach(function() {
    require('cordova/channel').onNativeReady.fire();
    cordova.require('cordova/channel').onPluginsReady.fire();
    window._nativeReady = true;
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

        contacts.find([], function onSuccess(contacts) {
          console.log('success', contacts.length);
          // alert('Found ' + contacts.length + ' contacts.');
          // expect(r.coords).toBeDefined();
          // alert(JSON.stringify(r));
          done();
        }, function onError(err) {
          console.log('error', err);
          done();
        }, {multiple: true});

      }, 1000);

    });
  })

});
