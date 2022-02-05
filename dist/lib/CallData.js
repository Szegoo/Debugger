"use strict";
exports.__esModule = true;
var CallData = /** @class */ (function () {
  function CallData(parent, parentCode, grandparent, lineNumber, message) {
    this.parent = parent;
    this.parentCode = parentCode;
    this.grandparent = grandparent;
    this.lineNumber = lineNumber;
    this.message = message;
  }
  CallData.prototype.getParent = function () {
    return this.parent;
  };
  CallData.prototype.getParentCode = function () {
    return this.parentCode;
  };
  CallData.prototype.getGrandparent = function () {
    return this.grandparent;
  };
  CallData.prototype.getLineNumber = function () {
    return this.lineNumber;
  };
  CallData.prototype.logData = function () {
    console.log(
      this.grandparent +
        ":" +
        this.parent +
        ":" +
        this.lineNumber +
        " " +
        this.message,
    );
  };
  return CallData;
})();
exports["default"] = CallData;
