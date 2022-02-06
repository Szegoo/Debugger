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
    this.generateInfo();
    return this.info;
  }

  private generateInfo() {
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
      this.getNewInfo(i);
    }
  }

  private getNewInfo(i: number) {
    const closingBracket = this.findClosingBracket(i);
    if (this.isCallInBlock(i, closingBracket)) {
      const newInfo = this.getBlockStatement(i);
      this.info += newInfo + ":";
    }
  }

  private findClosingBracket(startingIndx: number): number {
    let openingBrackets = 0;
    for (let i = startingIndx + 1; i < this.code.length - 1; i++) {
      openingBrackets = this.calculateOpeningBrackets(openingBrackets, i);
      if (this.isClosing(i) && openingBrackets <= 0) {
        openingBrackets = 0;
        return i;
      }
      if (this.isClosing(i)) {
        if (openingBrackets !== 0) openingBrackets--;
      }
    }
    throw new Error("Could not find closing bracket!");
  }

  private isCallInBlock(
    openingBracket: number,
    closingBracket: number,
  ): boolean {
    return this.callIndex > openingBracket && this.callIndex < closingBracket;
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

  private calculateOpeningBrackets(openingBrackets: number, i: number): number {
    if (this.isOpening(i)) {
      openingBrackets++;
    }
    return openingBrackets;
  }

  private isOpening(i: number): boolean {
    return this.code.charAt(i) === "{";
  }

  private isClosing(i: number): boolean {
    return this.code.charAt(i) === "}";
  }
}

export default CodeParser;
