"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skydapp_common_1 = require("skydapp-common");
class Delay {
    constructor(parent, callback, ms) {
        this.parent = parent;
        this.callback = callback;
        this.ms = ms;
        this.after = 0;
        this.resume();
    }
    resume() {
        if (this.parent.delays.includes(this) !== true) {
            this.parent.delays.push(this);
        }
    }
    pause() {
        skydapp_common_1.SkyUtil.pull(this.parent.delays, this);
    }
    delete() {
        this.pause();
    }
    step(deltaTime) {
        this.after += deltaTime;
        if (this.after >= this.ms) {
            this.callback();
            this.delete();
        }
    }
}
exports.default = Delay;
//# sourceMappingURL=Delay.js.map