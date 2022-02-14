import Logger from "./log/Logger";

interface ICallData {
  parent: string;
  parentCode: string;
  grandparent: string;
  lineNumber: string;
  message: string;
  info: string;
  logger: Logger;
}

class CallData {
  private callData: ICallData;

  public constructor(callData: ICallData) {
    this.callData = callData;
  }

  public getParent(): string {
    return this.callData.parent;
  }

  public getParentCode(): string {
    return this.callData.parentCode;
  }

  public getGrandparent(): string {
    return this.callData.grandparent;
  }

  public getLineNumber(): string {
    return this.callData.lineNumber;
  }

  public logData(): void {
    const { logger, parent, lineNumber, info, message, grandparent } =
      this.callData;
    logger.log(`${grandparent}:${parent}:${lineNumber}::${info} ${message}`);
  }
}

export { ICallData };
export default CallData;
