import CodeParser from "../../lib/CodeParser";

let codeParser: CodeParser;

describe("CodeParser unit test", () => {
  beforeEach(() => {
    codeParser = new CodeParser();
  });
  describe("code parsing", () => {
    it("should parse code num. 1", () => {
      const response = parse(0);
      expect(response).toBe("");
    });
    it("should parse code num. 2", () => {
      const response = parse(1);
      expect(response).toBe("if:if:while:");
    });
    it("should parse code num. 3", () => {
      const response = parse(2);
      expect(response).toBe("");
    });
    it("should throw an error given invalid function call", () => {
      expect(() => parse(3)).toThrow("Could not find function call!");
    });
  });
});

function parse(dataIndx: number) {
  return codeParser.parse(
    data[dataIndx].code,
    data[dataIndx].message,
    data[dataIndx].functionName,
  );
}

const data = [
  {
    code: `function test2() {
        const dbgr = new Debugger();
        dbgr.debug(test2, "hello");
    }`,
    functionName: "test2",
    message: "hello",
  },
  {
    code: `
    function test() {
        const dbgr = new Debugger();
        if (1 === 1) {
            let br = 0;
            while (br < 4) {
            br++;
            }
            if (0 === 0) {
                while (br < 5) {
                    dbgr.debug(test, "hello");
                    br++;
                }
            }
        }
    }
    `,
    message: "hello",
    functionName: "test",
  },
  {
    code: `function f2() {
        const deb = new Debugger();
        deb.debug(f2);
    }`,
    functionName: "f2",
    message: "",
  },
  {
    code: `function f2() {
        const deb = new Debugger();
        deb.debug(f3);
    }`,
    functionName: "f2",
    message: "",
  },
];
