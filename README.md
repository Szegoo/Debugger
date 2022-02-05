### Adebugger is an automated debugging tool

It helps you to read the output that is logged to your console.

It does so by logging the function that called the log and its parent function.

Install the package by running: `npm i adebugger`

Start using it:

```js
import { Debugger } from "adebugger";

function test() {
  const dbgr = new Debugger();
  dbgr.debug(test, "message");
}
```

The future versions will have more details about the function call like in which
block of code is the debug function called.
