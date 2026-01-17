import { Buffer } from "node:buffer";

if (typeof global.SlowBuffer === "undefined") {
    global.SlowBuffer = Buffer;
}
