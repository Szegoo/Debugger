import CallData, { ICallData } from "../../lib/CallData";
import Logger from "../../lib/log/FileLogger";
import fs from "fs";

const dummyData: ICallData = {
  parent: "parent",
  parentCode: "",
  grandparent: "grandparent",
  lineNumber: "12",
  message: "hello1",
  info: "",
  logger: new Logger(),
};

const output = "grandparent:parent:12:: hello1";

describe("CallData unit test", () => {
  let instance: CallData;
  beforeEach(() => {
    instance = instantiateDummy();
  });
  describe("instantiation", () => {
    it("should return correct line number", () => {
      expect(instance.getLineNumber()).toBe(dummyData.lineNumber);
    });
    it("should return correct parent", () => {
      expect(instance.getParent()).toBe(dummyData.parent);
    });
    it("should return correct grandparent", () => {
      expect(instance.getGrandparent()).toBe(dummyData.grandparent);
    });
    it("should return correct parent code", () => {
      expect(instance.getParentCode()).toBe(dummyData.parentCode);
    });
  });
  describe("output generation", () => {
    it("should get correct output", () => {
      instance.logData();
      const log = getLog();
      expect(log).toBe(output);
    });
  });
});

function instantiateDummy(): CallData {
  const instance = new CallData(dummyData);
  return instance;
}

function getLog(): string {
  const log = fs.readFileSync("log.txt", { encoding: "utf8" });
  return log;
}
