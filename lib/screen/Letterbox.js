"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DomNode_1 = __importDefault(require("../dom/DomNode"));
class Letterbox extends DomNode_1.default {
    constructor() {
        super(document.createElement("div"));
        this.style({
            position: "absolute",
            zIndex: 9999998,
            backgroundColor: "#000000",
        });
    }
}
exports.default = Letterbox;
//# sourceMappingURL=Letterbox.js.map