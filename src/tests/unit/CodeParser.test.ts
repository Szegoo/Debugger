import CodeParser from "../../lib/CodeParser";

describe("CodeParser unit test", () => {
  let codeParser: CodeParser;
  beforeEach(() => {
    codeParser = new CodeParser();
  });
  describe("code parsing", () => {
    it("should parse code num. 1", () => {
      const response = codeParser.parse(
        data[0].code,
        data[0].message,
        data[0].functionName,
      );
      expect(response).toBe("");
    });
    it("should parse code num. 2", () => {
      const response = codeParser.parse(
        data[1].code,
        data[1].message,
        data[1].functionName,
      );
      console.log(response);
      expect(response).toBe("if:if:while:");
    });
    it("should parse code num. 3", () => {
      const response = codeParser.parse(
        data[2].code,
        data[2].message,
        data[2].functionName,
      );
      console.log(response);
      expect(response).toBe("");
    });
  });
});

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
];
