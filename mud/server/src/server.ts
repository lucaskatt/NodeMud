import * as express from 'express';

let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.get('/prompt', function(req: express.Request, res: express.Response) {
	res.send('<h1>Hello world</h1>');
});

io.on('connection', function(socket: any) {
  console.log('a user connected');
});


http.listen(3001, function() {
	console.log('listening on *:3001');
});
