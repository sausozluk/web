define(function (require, exports, module) {
  require('base64');

  var storage = {
    get: function (k) {
      var result = localStorage[k];

      if (!result) {
        return result;
      }

      return Base64.decode(result);
    },
    set: function (k, v) {
      localStorage[k] = Base64.encode(v);
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
    get username() {
      return storage.get('username');
    },
    get permission() {
      return storage.get('permission');
    },
    get slug() {
      return storage.get('slug');
    },
    get adminToken() {
      return storage.get('adminToken');
    },
    set id(id) {
      storage.set('id', id);
    },
    set token(token) {
      storage.set('token', token);
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
    set adminToken(token) {
      storage.set('adminToken', token);
    },
    cleanAdminToken: function () {
      this.remove('adminToken');
    },
    clean: function () {
      this.remove('id');
      this.remove('token');
      this.remove('permission');
      this.remove('username');
      this.remove('slug');
    },
    remove: storage.remove
  };
});
