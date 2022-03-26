"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GameNode_1 = __importDefault(require("./GameNode"));
class FixedNode extends GameNode_1.default {
    step(deltaTime, x, y, scaleX, scaleY, angle, sin, cos, alpha) {
        super.step(deltaTime, this.screen === undefined ? 0 : this.screen.camera.x, this.screen === undefined ? 0 : this.screen.camera.y, scaleX, scaleY, angle, sin, cos, alpha);
    }
}
exports.default = FixedNode;
//# sourceMappingURL=FixedNode.js.map