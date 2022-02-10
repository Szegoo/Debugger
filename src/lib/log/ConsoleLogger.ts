import Logger from "./Logger";

class ConsoleLogger implements Logger {
  public log(msg: string): void {
    console.log(msg);
  }
}

export default ConsoleLogger;
