var Socket = function (token) {
  this.socket = io(location.origin, {
    path: '/service/ws',
    query: 'token=' + token,
    reconnectionDelay: 1000,
    reconnectionAttempts: 5
  });

  this.socket.on('connect', this.open.bind(this));
  this.socket.on('message', this.onMessage.bind(this));
  this.socket.on('disconnect', this.close.bind(this));
  this.socket.on('error', this.onError.bind(this));
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
    this.socket.disconnect();
  }

  this.socket = null;
  this.sendToMainThread(false);
};

Socket.prototype.onMessage = function (data) {
  this.sendToMainThread(data);
};

Socket.prototype.onError = function () {
  this.kill();
};

Socket.prototype.send = function (data) {
  this.socket.emit(data.action, data.data);
};

var socket = null;

onmessage = function (e) {
  var payload = e.data;
  var action = payload.action;
  var data = payload.data;

  if (action === 'start') {
    importScripts(data.socketIoLib);
    socket = new Socket(data.token);
  } else if (socket && action === 'message') {
    socket.send(data);
  } else if (socket && action === 'close') {
    socket.kill();
  }
};