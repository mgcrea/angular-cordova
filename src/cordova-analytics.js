'use strict';

angular.module('cordova.analytics', ['cordova'])

  .service('$analytics', function($cordova, $q) {

    // id = the GA account ID of the form 'UA-00000000-0'
    // period = the minimum interval for transmitting tracking events if any exist in the queue
    this.init = function(id, period) {
      return $cordova.exec('GAPlugin', 'initGA', [id, period || 10]);
    };

    // category = The event category. This parameter is required to be non-empty.
    // eventAction = The event action. This parameter is required to be non-empty.
    // eventLabel = The event label. This parameter may be a blank string to indicate no label.
    // eventValue = The event value. This parameter may be -1 to indicate no value.
    this.trackEvent = function(category, eventAction, eventLabel, eventValue) {
      return $cordova.exec('GAPlugin', 'trackEvent', [category, eventAction, eventLabel || '', eventValue || -1]);
    };

    // url = the URL of the page view
    this.trackPage = function(url) {
      return $cordova.exec('GAPlugin', 'trackPage', [url]);
    };

    // index = the numerical index of the dimension to which this variable will be assigned (1 - 20)
    // value = the value of the variable you are logging
    this.setVariable = function(index, value) {
      return $cordova.exec('GAPlugin', 'setVariable', [index, value]);
    };

    this.destroy = function(index, value) {
      return $cordova.exec('GAPlugin', 'exitGA', []);
    };

  });


/*'use strict';

angular.module('$analytics', [])

.service('$analytics', ['$rootScope', '$window', '$location', '$routeParams', function($rootScope, $window, $location, $routeParams) {

  var _this = this;

  this.init = function(options) {
    _this.setAccount(options.account);
    _this.trackPageview();
    var ga = document.createElement('script');
    ga.type = 'text/javascript';
    ga.async = true;
    ga.src = ('https:' === document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ga, s);
  };

  angular.forEach(['setAccount', 'setDomainName', 'setCustomVar', 'trackPageview', 'trackEvent'], function(action) {
    _this[action] = function() {
      var args = Array.prototype.slice.call(arguments, 0);
      args.unshift('_' + action);
      $window._gaq.push(args);
    };
  });

  $rootScope.$on('$viewContentLoaded', function() {
    _this.trackPageview($location.path());
  });

}]);
*/