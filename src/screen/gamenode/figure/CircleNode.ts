import * as PIXI from "pixi.js";
import FigureNode from "./FigureNode";

export default class CircleNode extends FigureNode {

    constructor(x: number, y: number, width: number, height: number, color: number) {
        super(x, y);
        const graphics = new PIXI.Graphics();
        graphics.beginFill(color);
        graphics.drawEllipse(0, 0, width / 2, height / 2);
        this.pixiContainer.addChild(graphics);
    }
}
