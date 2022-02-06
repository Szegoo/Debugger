class CodeParser {
  private blockStatements = ["if", "while", "for"];
  private code: string;
  private message: string;
  private functionName: string;
  private callIndex: number;
  private info: string = "";

  public parse(code: string, message: string, functionName: string): string {
    this.code = code;
    this.message = message;
    this.functionName = functionName;
    this.findFunctionCall();
    return this.info;
  }

  private findFunctionCall() {
    this.getCallIndx();
    this.getCallInfo();
  }

  private getCallIndx(): number {
    const pattern = new RegExp(
      `debug\\(${this.functionName}, ("|'|\`)${this.message}("|'|\`)\\)`,
    );
    const match = pattern.exec(this.code);
    if (match) {
      this.callIndex = match.index;
      return;
    }
    throw new Error("Could not find function call!");
  }

  private getCallInfo() {
    let numberOfBrackets = 0;
    for (let i = 0; i < this.code.length; i++) {
      if (this.isOpening(i)) {
        numberOfBrackets++;
        this.addBlockToInfo(i, numberOfBrackets);
      }
    }
  }

  private addBlockToInfo(i, numberOfBrackets) {
    if (numberOfBrackets !== 1) {
      const closingBracket = this.findClosingBracket(i);
      if (this.isCallInBlock(i, closingBracket)) {
        const newInfo = this.getBlockStatement(i);
        this.info += newInfo + ":";
      }
    }
  }

  private getBlockStatement(openingBracket: number): string {
    let section = this.code.substring(0, openingBracket);
    let lastIndx = 0;
    let lastStatement = "";
    this.blockStatements.forEach(blockStatement => {
      const indx = section.lastIndexOf(blockStatement);
      if (indx > lastIndx) {
        lastIndx = indx;
        lastStatement = blockStatement;
      }
    });
    return lastStatement;
  }

  private findClosingBracket(startingIndx: number): number {
    let openingBrackets = 0;
    for (let i = startingIndx + 1; i < this.code.length - 1; i++) {
      if (this.isOpening(i)) {
        openingBrackets++;
      }
      if (this.isClosing(i) && openingBrackets === 0) {
        return i;
      }
      if (this.isClosing(i)) {
        openingBrackets--;
      }
    }
    throw new Error("Could not find closing bracket!");
  }

  private isOpening(i): boolean {
    return this.code.charAt(i) === "{";
  }

  private isClosing(i): boolean {
    return this.code.charAt(i) === "}";
  }

  private isCallInBlock(
    openingBracket: number,
    closingBracket: number,
  ): boolean {
    return this.callIndex > openingBracket && this.callIndex < closingBracket;
  }
}

export default CodeParser;
