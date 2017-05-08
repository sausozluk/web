define(function (require, exports, module) {
  var all = {};

  var list = function (type) {
    var t = type.toLocaleLowerCase();
    return all[t] || (all[t] = []);
  };

  module.exports = {
    on: function (type, handler) {
      list(type).push(handler);
    },
    off: function (type, handler) {
      var e = list(type);
      var i = e.indexOf(handler);
      if (i > -1) {
        e.splice(i, 1);
      }
    },
    emit: function (type, event) {
      list('*')
        .concat(list(type))
        .forEach(function (f) {
          f(event);
        });
    }
  };
});