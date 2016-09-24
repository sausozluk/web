var socket = null;

var kill = function () {
  if (socket) {
    socket.close();
  }
  socket = null;
  postMessage(false);
};

var open = function () {
  console.log('[SOCKET]', 'opened');
  postMessage(true);
};

var close = function () {
  kill();
};

var message = function (e) {
  var obj = JSON.parse(e.data);
  postMessage(obj);
};

var error = function (e) {
  kill();
};

var initSocket = function (data) {
  socket = new WebSocket('ws://localhost:7331' + '/' + data.token);
  socket.onopen = open;
  socket.onclose = close;
  socket.onmessage = message;
  socket.onerror = error;
};

var sendMessage = function (message) {
  socket.send(JSON.stringify(message));
};

onmessage = function (e) {
  if (e.data.action === 'start') {
    initSocket(e.data.data);
  } else if (e.data.action === 'message') {
    sendMessage(e.data.data);
  }
};