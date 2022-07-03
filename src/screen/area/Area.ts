import * as PIXI from "pixi.js";
import GameNode from "../gamenode/GameNode";

export default abstract class Area {

    public parent: GameNode | undefined;

    constructor(public x: number, public y: number) { }

    public getPixiGraphics(color: number) {
        const graphics = new PIXI.Graphics();
        graphics.x = this.x;
        graphics.y = this.y;
        graphics.beginFill(color, 0.2);
        graphics.lineStyle(1, color);
        graphics.drawRect(-1, -1, 2, 2);
        graphics.zIndex = 9999999;
        return graphics;
    }

    public abstract checkPoint(x: number, y: number): boolean;
}
