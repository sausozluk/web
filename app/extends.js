require(['moment'], function (moment) {
  moment.locale('tr');

  String.prototype.replaceAll = function (search, replacement) {
    return this.replace(new RegExp(search, 'g'), replacement);
  };

  return true;
});