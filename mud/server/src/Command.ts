export enum States {
    None = 0, 
    Noncombat = 1 << 0, //0001
    Combat = 1 << 1,    //0010
}

export class Command {
  name: string;
  allowedStates: number;
  handler: Function;
}
