export class Character {
  public room: string;
  public state: number;
  public socket: SocketIO.Socket;
        
  constructor(socket: SocketIO.Socket) {
    this.socket = socket;
  }
}
