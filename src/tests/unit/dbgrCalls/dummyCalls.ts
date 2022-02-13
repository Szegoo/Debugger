import Debugger from "../../../lib/Debugger";

function test1(dbgr: Debugger) {
  dbgr.debug(test1, "hello");
}

function test2(dbgr: Debugger) {
  test1(dbgr);
}

function test3(dbgr: Debugger) {
  dbgr.debug(test3);
}

export { test1, test2, test3 };
