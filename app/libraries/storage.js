define(function (require, exports, module) {
  var dillikasarli = {
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
      return dillikasarli.get('id');
    },
    get token() {
      return dillikasarli.get('token');
    },
    get email() {
      return dillikasarli.get('email');
    },
    get username() {
      return dillikasarli.get('username');
    },
    get permission() {
      return dillikasarli.get('permission');
    },
    get slug() {
      return dillikasarli.get('slug');
    },
    get badge() {
      return dillikasarli.get('badge');
    },
    set id(id) {
      dillikasarli.set('id', id);
    },
    set token(token) {
      dillikasarli.set('token', token);
    },
    set email(email) {
      dillikasarli.set('email', email);
    },
    set username(username) {
      dillikasarli.set('username', username);
    },
    set permission(permission) {
      dillikasarli.set('permission', permission);
    },
    set slug(slug) {
      dillikasarli.set('slug', slug);
    },
    set badge(badge) {
      dillikasarli.set('badge', badge);
    },
    remove: dillikasarli.remove
  };
});
