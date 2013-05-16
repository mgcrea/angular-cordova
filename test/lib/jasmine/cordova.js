
var require = cordova.require;
var define = cordova.define;

beforeEach(function() {
  helper.createStage();
})

afterEach(function() {
  document.getElementById('stage').innerHTML = '';
});

var helper = {
  createStage: function() {
    var el = document.createElement("div");
    el.id = 'stage';
    document.body.appendChild(el);
  },
  trigger: function(obj, name) {
    var e = document.createEvent('Event');
    e.initEvent(name, true, true);
    obj.dispatchEvent(e);
  },
  getComputedStyle: function(querySelector, property) {
    var element = document.querySelector(querySelector);
    return window.getComputedStyle(element).getPropertyValue(property);
  }
};
