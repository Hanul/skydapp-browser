import * as PIXI from "pixi.js";
import GameNode from "../GameNode";
export default abstract class Area {
    x: number;
    y: number;
    parent: GameNode | undefined;
    constructor(x: number, y: number);
    getPixiGraphics(color: number): PIXI.Graphics;
    abstract checkPoint(x: number, y: number): boolean;
}
//# sourceMappingURL=Area.d.ts.map