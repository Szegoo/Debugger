"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
exports.__esModule = true;
var Debugger_1 = __importDefault(require("./lib/Debugger"));
function test() {
  var dbgr = new Debugger_1["default"]();
  dbgr.debug(test, "poruka");
}
test();
