import Debugger from "../../lib/Debugger";
import Logger from "../../lib/log/FileLogger";
import { test1, test2, test3 } from "./dbgrCalls/dummyCalls";
import fs from "fs";

let dbgr: Debugger;
describe("Debugger unit test", () => {
  beforeEach(() => {
    dbgr = new Debugger(new Logger());
  });
  it("given correct args should print correct message", () => {
    test1(dbgr);
    const log = getLog();
    expect(log).toBe("#:test1:4:: hello");
  });
  it("should pass and print grandparent", () => {
    test2(dbgr);
    const log = getLog();
    expect(log).toBe("test2:test1:4:: hello");
  });
  it("should pass given console logger", () => {
    console.log = jest.fn();
    test1(new Debugger());
    expect(getConsoleLog()).toBe("#:test1:4:: hello");
  });
  it("should pass without message", () => {
    test3(dbgr);
    const log = getLog();
    expect(log).toBe("#:test3:12:: ");
  });
});

function getLog(): string {
  const log = fs.readFileSync("log.txt", { encoding: "utf8" });
  return log;
}

function getConsoleLog(): string {
  //@ts-ignore
  return console.log.mock.calls[0][0];
}
