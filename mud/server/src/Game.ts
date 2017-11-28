import {CommandStates, Command} from './Command';
import {Character} from './Character';

export interface CharacterIndex {
  [key: string]: Character;
}

//move this to room? or have interaface file
interface CommandIndex {
  [key: string]: Command;
}

export class Game {

  private connectedCharacters: CharacterIndex;
  private io: SocketIO.Server;
  private globalCommands: CommandIndex = {};

  constructor(connectedCharacters: CharacterIndex, io: SocketIO.Server) {
    this.connectedCharacters = connectedCharacters;
    this.io = io;
  }
  
  public receiveCommand(cmd: string): void {
    //everything after the command name (first word) should be a parameter to the command handler
    //convert command to lowercase
    //strip ending whitespace
    //check if the command exists in global, chracter, or room and call the appropriate handler
    


  }

  private buildGlobalCommands(): void {
    this.globalCommands['help'] = new Command('help', 'Enter "help [command]" to see the description of a command', this.handleCommandHelp, CommandStates.Noncombat | CommandStates.Combat);
    
  }

  private handleCommandHelp(character: Character, args?: string): void {
    if (!args) {
      character.socket.emit('prompt', this.globalCommands['help'].description);
      return;
    }
    let command = this.findCommand(args, character);
    if (command) {
      character.socket.emit('prompt', command.description);
    }
    else {
      character.socket.emit('prompt', args + ' is not a valid command.');
    }
  }

  private findCommand(cmd: string, character: Character): Command {
    if (this.globalCommands[cmd]) {
      return this.globalCommands[cmd];
    }
    else return null;
  }
}
