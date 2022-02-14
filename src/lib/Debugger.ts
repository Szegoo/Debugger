import CallData from "./CallData";
import CodeParser from "./CodeParser";
import Logger from "./log/Logger";
import ConsoleLogger from "./log/ConsoleLogger";
import { ICallData } from "./CallData";

class Debugger {
  private message: string;
  private parentFn: any;
  private e: Error;
  private codeParser: CodeParser;
  private logger: Logger;

  constructor(logger: Logger = new ConsoleLogger()) {
    this.logger = logger;
  }

  public debug(parentFn: any, message: string = ""): void {
    this.e = new Error();
    this.initializeDebugger(parentFn, message);
    const data = this.extractCallData();
    data.logData();
  }

  private initializeDebugger(parentFn: any, message?: string) {
    this.parentFn = parentFn;
    this.message = message;
    this.codeParser = new CodeParser();
  }

  private extractCallData(): CallData {
    const callData = this.getCallData();
    return new CallData(callData);
  }

  private getCallData(): ICallData {
    const parent = this.getParentFunctionName();
    const grandparent = this.getGrandParentFunctionName();
    const lineNumber = this.getLineNumber();
    const parentCode = this.getFunctionCode();
    const info = this.codeParser.parse(parentCode, this.message, parent);
    return {
      message: this.message,
      parent,
      grandparent,
      lineNumber,
      parentCode,
      info,
      logger: this.logger,
    };
  }

  private getParentFunctionName(): string {
    const frame = this.getFrame(this.e);
    const functionName = frame.split(" ")[5];
    return functionName;
  }

  private getGrandParentFunctionName(): string {
    const frame = this.getFrame(this.e, 3);
    const functionName = frame.split(" ")[5];
    if (functionName === "Object.<anonymous>") return "#";
    return functionName;
  }

  private getLineNumber(): string {
    const frame = this.getFrame(this.e);
    const lineNumber = frame.split(":").reverse()[1];
    return lineNumber;
  }

  private getFunctionCode(): string {
    return this.parentFn.toString();
  }

  private getFrame(e: Error, indx: number = 2) {
    return e.stack.split("\n")[indx];
  }
}

export default Debugger;
