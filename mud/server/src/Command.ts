export enum CommandStates {
    None = 0, 
    Noncombat = 1 << 0, //0001
    Combat = 1 << 1,    //0010
}

export class Command {
  public name: string;
  public description: string;
  public handler: Function;
  public allowedStates: CommandStates;

  constructor(name: string, description: string, handler: Function, allowedStates: CommandStates = CommandStates.Noncombat) {
    this.name = name;
    this.description = description;
    this.handler = handler;
    this.allowedStates = allowedStates;
  }
}
