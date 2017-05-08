define(function (require, exports, module) {
  var storage = {
    get: function (k) {
      var result = localStorage[k];

      if (!result) {
        return result;
      }

      var arr = atob(result).split('|');

      if (arr[1] === 'number') {
        return parseFloat(arr[0]);
      } else if (arr[1] === 'boolean') {
        return JSON.parse(arr[0]);
      } else {
        return arr[0];
      }
    },
    set: function (k, v) {
      localStorage[k] = btoa(v + '|' + typeof v);
    },
    remove: function (k) {
      localStorage.removeItem(k);
    }
  };

  module.exports = {
    get id() {
      return storage.get('id');
    },
    get token() {
      return storage.get('token');
    },
    get email() {
      return storage.get('email');
    },
    get username() {
      return storage.get('username');
    },
    get permission() {
      return storage.get('permission');
    },
    get slug() {
      return storage.get('slug');
    },
    set id(id) {
      storage.set('id', id);
    },
    set token(token) {
      storage.set('token', token);
    },
    set email(email) {
      storage.set('email', email);
    },
    set username(username) {
      storage.set('username', username);
    },
    set permission(permission) {
      storage.set('permission', permission);
    },
    set slug(slug) {
      storage.set('slug', slug);
    },
    remove: storage.remove
  };
});
