import Area from "./Area";
export default class Circle extends Area {
    private width;
    private height;
    constructor(x: number, y: number, width: number, height: number);
    getPixiGraphics(color: number): import("pixi.js").Graphics;
    checkPoint(x: number, y: number): boolean;
}
//# sourceMappingURL=Circle.d.ts.map