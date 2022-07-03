"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GameNode_1 = __importDefault(require("./GameNode"));
class StatesNode extends GameNode_1.default {
    constructor(x, y, states, baseState) {
        super(x, y);
        this.states = {};
        if (states !== undefined) {
            for (const [state, node] of Object.entries(states)) {
                if (node !== undefined) {
                    this.addState(state, node);
                }
            }
        }
        if (baseState !== undefined) {
            this.state = baseState;
        }
    }
    addState(state, node) {
        var _a;
        (_a = this.states[state]) === null || _a === void 0 ? void 0 : _a.delete();
        this.states[state] = node.appendTo(this);
        node.hide();
    }
    changeState(state, animationendHandler) {
        var _a, _b;
        (_a = this.currentStateNode) === null || _a === void 0 ? void 0 : _a.hide();
        this.currentStateNode = this.states[state];
        (_b = this.currentStateNode) === null || _b === void 0 ? void 0 : _b.show();
    }
    existsState(state) {
        return this.states[state] !== undefined;
    }
    set state(state) {
        this.changeState(state);
    }
}
exports.default = StatesNode;
//# sourceMappingURL=StatesNode.js.map