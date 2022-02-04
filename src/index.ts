import Debugger from "./lib/Debugger";

function test() {
  const dbgr = new Debugger();
  dbgr.debug(test, "poruka");
}

test();
