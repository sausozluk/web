var Socket = function (token) {
  this.uri = 'ws:' + location.origin.split(':').slice(1, 2).toString() + ':8080' + '/' + token;
  this.socket = new WebSocket(this.uri);
  this.socket.onopen = this.open.bind(this);
  this.socket.onclose = this.close.bind(this);
  this.socket.onmessage = this.onMessage.bind(this);
  this.socket.onerror = this.onError.bind(this);
};

Socket.prototype.sendToMainThread = function (data) {
  postMessage(data);
};

Socket.prototype.open = function () {
  this.sendToMainThread(true);
};

Socket.prototype.close = function () {
  this.kill();
};

Socket.prototype.kill = function () {
  if (this.socket) {
    this.socket.close();
  }

  this.socket = null;
  this.sendToMainThread(false);
};

Socket.prototype.onMessage = function (event) {
  this.sendToMainThread(JSON.parse(event.data));
};

Socket.prototype.onError = function () {
  this.kill();
};

Socket.prototype.send = function (data) {
  this.socket.send(JSON.stringify(data));
};

var socket = null;

onmessage = function (e) {
  var payload = e.data;
  var action = payload.action;
  var data = payload.data;

  if (action === 'start') {
    socket = new Socket(data.token);
  } else if (socket && action === 'message') {
    socket.send(data);
  } else if (socket && action === 'close') {
    socket.kill();
  }
};