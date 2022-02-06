class CallData {
  private parent: string;
  private parentCode: string;
  private grandparent: string;
  private lineNumber: string;
  private message: string;
  private info: string;

  public constructor(
    parent: string,
    parentCode: string,
    grandparent: string,
    lineNumber: string,
    message: string,
    info: string,
  ) {
    this.parent = parent;
    this.parentCode = parentCode;
    this.grandparent = grandparent;
    this.lineNumber = lineNumber;
    this.message = message;
    this.info = info;
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
      `${this.grandparent}:${this.parent}:${this.lineNumber}::${this.info} ${this.message}`,
    );
  }
}

export default CallData;
