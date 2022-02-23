class CodeParser {
  private blockStatements = ["if", "while", "for"];
  private code: string;
  private message: string;
  private functionName: string;
  private info: string = "";

  public parse(code: string, message: string, functionName: string): string {
    this.code = code;
    this.message = message;
    this.functionName = functionName;
    this.generateInfo();
    return this.info;
  }

  private generateInfo() {
    const indx = this.getCallIndx();
    this.getCallInfo(indx);
  }

  private getCallIndx(): number {
    const pattern = this.getParentRegex();
    const match = pattern.exec(this.code);
    if (match) {
      this.isCallUnique(pattern);
      return match.index;
    }
    throw new Error("Could not find function call!");
  }

  private getParentRegex(): RegExp {
    if (this.message === "") {
      return new RegExp(`debug\\(${this.functionName}\\)`, "g");
    }
    return new RegExp(
      `debug\\(${this.functionName}, ("|'|\`)${this.message}("|'|\`)\\)`,
      "g",
    );
  }

  private isCallUnique(pattern: RegExp) {
    if (this.code.match(pattern).length > 1) {
      throw new Error("Two or more function calls are the same!");
    }
  }

  private getCallInfo(callIndx: number) {
    let numberOfBrackets = 0;
    for (let i = 0; i < this.code.length; i++) {
      if (this.isOpening(i)) {
        numberOfBrackets++;
        this.addBlockToInfo(i, numberOfBrackets, callIndx);
      }
    }
  }

  private addBlockToInfo(i, numberOfBrackets, callIndx: number) {
    if (numberOfBrackets !== 1) {
      this.getNewInfo(i, callIndx);
    }
  }

  private getNewInfo(i: number, callIndx: number) {
    const closingBracket = this.findClosingBracket(i);
    if (this.isCallInBlock(i, closingBracket, callIndx)) {
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

  private calculateOpeningBrackets(openingBrackets: number, i: number): number {
    if (this.isOpening(i)) {
      openingBrackets++;
    }
    return openingBrackets;
  }

  private isCallInBlock(
    openingBracket: number,
    closingBracket: number,
    callIndx: number,
  ): boolean {
    return callIndx > openingBracket && callIndx < closingBracket;
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

  private isOpening(i: number): boolean {
    return this.code.charAt(i) === "{";
  }

  private isClosing(i: number): boolean {
    return this.code.charAt(i) === "}";
  }
}

export default CodeParser;
