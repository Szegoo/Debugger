class CallData {
  private parent: string;
  private parentCode: string;
  private grandparent: string;
  private lineNumber: string;
  private message: string;

  public constructor(
    parent: string,
    parentCode: string,
    grandparent: string,
    lineNumber: string,
    message: string,
  ) {
    this.parent = parent;
    this.parentCode = parentCode;
    this.grandparent = grandparent;
    this.lineNumber = lineNumber;
    this.message = message;
  }

  public getParent(): string {
    return this.parent;
  }

  public getParentCode(): string {
    return this.parentCode;
  }

  public getGrandparent(): string {
    return this.grandparent;
  }

  public getLineNumber(): string {
    return this.lineNumber;
  }

  public logData(): void {
    console.log(
      `${this.grandparent}:${this.parent}:${this.lineNumber} ${this.message}`,
    );
  }
}
class Debugger {
  private message: string;

  public debug(message?: string): void {
    this.message = message;
    const e = new Error();
    const data = this.extractCallData(e);
    data.logData();
  }

  private extractCallData(e: Error): CallData {
    const parent = this.getParentFunctionName(e);
    const grandparent = this.getGrandParentFunctionName(e);
    const lineNumber = this.getLineNumber(e);
    const parentCode = this.getFunctionCode(parent);
    return new CallData(
      parent,
      parentCode,
      grandparent,
      lineNumber,
      this.message,
    );
  }

  private getParentFunctionName(e: Error): string {
    const frame = this.getFrame(e);
    const functionName = frame.split(" ")[5];
    return functionName;
  }

  private getFrame(e: Error, indx: number = 2) {
    return e.stack.split("\n")[indx];
  }

  private getFunctionCode(functionName: string): string {
    return eval(functionName).toString();
  }

  private getLineNumber(e: Error): string {
    const frame = this.getFrame(e);
    const lineNumber = frame.split(":").reverse()[1];
    return lineNumber;
  }

  private getGrandParentFunctionName(e: Error): string {
    const frame = this.getFrame(e, 3);
    const functionName = frame.split(" ")[5];
    if (functionName === "Object.<anonymous>") return "#";
    return functionName;
  }
}

function test() {
  const dbgr = new Debugger();
  dbgr.debug("poruka");
}

test();
