import Area from "./Area";
export default class Polygon extends Area {
    private points;
    constructor(x: number, y: number, points: {
        x: number;
        y: number;
    }[]);
    getPixiGraphics(color: number): import("pixi.js").Graphics;
    checkPoint(x: number, y: number): boolean;
}
//# sourceMappingURL=Polygon.d.ts.map