import CollisionChecker from "../utils/CollisionChecker";
import Area from "./Area";

export default class Circle extends Area {

    constructor(x: number, y: number, private width: number, private height: number) {
        super(x, y);
    }

    public getPixiGraphics(color: number) {
        const graphics = super.getPixiGraphics(color);
        graphics.drawEllipse(-this.width / 2, -this.height / 2, this.width, this.height);
        return graphics;
    }

    public checkPoint(x: number, y: number): boolean {
        if (this.parent === undefined) {
            return false;
        }
        //TODO: 잘못 구현됨
        return CollisionChecker.checkPointInCircle(
            x, y,
            this.parent.r_x, this.parent.r_y,
            this.width, this.height,
            this.parent.r_scaleX, this.parent.r_scaleY,
            this.parent.r_sin, this.parent.r_cos,
        );
    }
}
