"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
exports.__esModule = true;
var CallData_1 = __importDefault(require("./CallData"));
var Debugger = /** @class */ (function () {
  function Debugger() {}
  Debugger.prototype.debug = function (parentFn, message) {
    this.e = new Error();
    this.initializeDebugger(parentFn, message);
    var data = this.extractCallData();
    data.logData();
  };
  Debugger.prototype.initializeDebugger = function (parentFn, message) {
    this.parentFn = parentFn;
    this.message = message;
  };
  Debugger.prototype.extractCallData = function () {
    var parent = this.getParentFunctionName();
    var grandparent = this.getGrandParentFunctionName();
    var lineNumber = this.getLineNumber();
    var parentCode = this.getFunctionCode();
    return new CallData_1["default"](
      parent,
      parentCode,
      grandparent,
      lineNumber,
      this.message,
    );
  };
  Debugger.prototype.getParentFunctionName = function () {
    var frame = this.getFrame(this.e);
    var functionName = frame.split(" ")[5];
    return functionName;
  };
  Debugger.prototype.getGrandParentFunctionName = function () {
    var frame = this.getFrame(this.e, 3);
    var functionName = frame.split(" ")[5];
    if (functionName === "Object.<anonymous>") return "#";
    return functionName;
  };
  Debugger.prototype.getLineNumber = function () {
    var frame = this.getFrame(this.e);
    var lineNumber = frame.split(":").reverse()[1];
    return lineNumber;
  };
  Debugger.prototype.getFunctionCode = function () {
    return this.parentFn.toString();
  };
  Debugger.prototype.getFrame = function (e, indx) {
    if (indx === void 0) {
      indx = 2;
    }
    return e.stack.split("\n")[indx];
  };
  return Debugger;
})();
exports["default"] = Debugger;
