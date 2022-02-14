import Debugger from "./lib/Debugger";

function test() {
  const dbgr = new Debugger();
  if (1 === 1) {
    let br = 0;
    while (br < 4) {
      br++;
    }
    if (0 === 0) {
      while (br < 5) {
        dbgr.debug(test);
        br++;
      }
      dbgr.debug(test);
    }
  }
}
test();
