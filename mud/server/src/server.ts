import * as express from 'express';
import {Character} from './Character';
import {CharacterIndex, Game} from './Game';

let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

class server {
  private connectedCharacters: CharacterIndex = {};
  private game: Game;

  constructor() {
    this.initializeSocket();
    this.game = new Game(this.connectedCharacters, io);

    http.listen(3001, function() {
      console.log('listening on *:3001');
    });
  }

  public initializeSocket() {
    io.on('connection', (socket: SocketIO.Socket) => {
      this.handleConnect(socket);

      socket.on('disconnect', () => {
        this.handleDisconnect(socket);
      });

      socket.on('command', (cmd: string) => {
        this.handleCommand(socket, cmd);
      });
    });
  }

  private handleConnect(socket: SocketIO.Socket): void {
    console.log('a user connected ' + socket.id);
    this.connectedCharacters[socket.id] = new Character(socket);
  }

  private handleDisconnect(socket: SocketIO.Socket): void {
    console.log('a user disconnected ' + socket.id);
    delete this.connectedCharacters[socket.id];
  }

  private handleCommand(socket: SocketIO.Socket, cmd: string): void {
    console.log(socket.id + ' commands: ' + cmd);
  }
}

let svr = new server();
