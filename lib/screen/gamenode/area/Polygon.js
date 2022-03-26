"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CollisionChecker_1 = __importDefault(require("../../utils/CollisionChecker"));
const Area_1 = __importDefault(require("./Area"));
class Polygon extends Area_1.default {
    constructor(x, y, points) {
        super(x, y);
        this.points = points;
    }
    getPixiGraphics(color) {
        const graphics = super.getPixiGraphics(color);
        if (this.points.length > 0) {
            graphics.moveTo(this.points[0].x, this.points[0].y);
            for (let i = 1; i < this.points.length; i += 1) {
                const point = this.points[i];
                graphics.lineTo(point.x, point.y);
            }
            graphics.lineTo(this.points[0].x, this.points[0].y);
        }
        return graphics;
    }
    checkPoint(x, y) {
        if (this.parent === undefined) {
            return false;
        }
        return CollisionChecker_1.default.checkPointInPolygon(x, y, this.parent.r_x, this.parent.r_y, this.points, this.parent.r_scaleX, this.parent.r_scaleY, this.parent.r_sin, this.parent.r_cos);
    }
}
exports.default = Polygon;
//# sourceMappingURL=Polygon.js.map