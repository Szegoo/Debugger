class CodeParser {
  private blockStatements = ["if", "while", "for"];
  private code: string;
  private message: string;
  private functionName: string;

  public parse(code: string, message: string, functionName: string) {
    this.code = code;
    this.message = message;
    this.functionName = functionName;
    this.findFunctionCall();
  }

  private findFunctionCall() {
    const indx = this.getCallIndx();
  }

  private getCallIndx(): number {
    const pattern = new RegExp(
      `debug\\(${this.functionName}, ("|'|\`)${this.message}("|'|\`)\\)`,
    );
    const match = pattern.exec(this.code);
    if (match) {
      console.log("match: " + match.index);
      return match.index;
    }
    throw new Error("Could not find function call!");
  }
}

export default CodeParser;
