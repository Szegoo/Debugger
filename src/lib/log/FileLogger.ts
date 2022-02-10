import Logger from "./Logger";
import fs from "fs";

class FileLogger implements Logger {
  private file: string = "log.txt";
  public log(msg: string): void {
    fs.writeFileSync(this.file, msg);
  }
}

export default FileLogger;
