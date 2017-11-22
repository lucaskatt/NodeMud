import {States, Command} from './Command';

export interface CharacterIndex {
  [key: string]: Character;
}

export class Game {

  private connectedCharacters: CharacterIndex;

  constructor(connectedCharacters: CharacterIndex) {
    this.connectedCharacters = connectedCharacters;
  }

  
  
  public receiveCommand(cmd: string, ) {


  }
}
