"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CollisionChecker_1 = __importDefault(require("../../utils/CollisionChecker"));
const Area_1 = __importDefault(require("./Area"));
class Rect extends Area_1.default {
    constructor(x, y, width, height) {
        super(x, y);
        this.width = width;
        this.height = height;
    }
    getPixiGraphics(color) {
        const graphics = super.getPixiGraphics(color);
        return graphics;
    }
    checkPoint(x, y) {
        if (this.parent === undefined) {
            return false;
        }
        return CollisionChecker_1.default.checkPointInRect(x, y, this.parent.r_x, this.parent.r_y, this.width, this.height, this.parent.r_scaleX, this.parent.r_scaleY, this.parent.r_sin, this.parent.r_cos);
    }
}
exports.default = Rect;
//# sourceMappingURL=Rect.js.map