import Debugger from "./lib/Debugger";

//this function is made to test the code
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

test();
