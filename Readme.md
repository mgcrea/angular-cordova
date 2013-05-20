# Cordova Angular suite

The purpose of this repository for now is to be able to run real cordova tests on an iOS device (without mocking up the native part).

Work is in progress with [node-ios-browser](https://github.com/mgcrea/node-ios-browser).

Only working implementation so far is with a custom suite using testem.


## [Testem](https://github.com/airportyh/testem)

Test are working with a custom suite `testem -f test/testem-cordova.json --browsers ios`.

Test are failing with the provided jasmine suite `testem -f test/testem.json --browsers ios`.

## [Karma](https://github.com/karma-runner/karma)

Tests are failing with `karma start test/karma.conf.js --browsers ios-browser`.


## Authors

**Olivier Louvignes**

+ http://olouv.com
+ http://github.com/mgcrea