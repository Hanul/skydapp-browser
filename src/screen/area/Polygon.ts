import CollisionChecker from "../utils/CollisionChecker";
import Area from "./Area";

export default class Polygon extends Area {

    constructor(x: number, y: number, private points: { x: number, y: number }[]) {
        super(x, y);
    }

    public getPixiGraphics(color: number) {
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

    public checkPoint(x: number, y: number): boolean {
        if (this.parent === undefined) {
            return false;
        }
        //TODO: 잘못 구현됨
        return CollisionChecker.checkPointInPolygon(
            x, y,
            this.parent.r_x, this.parent.r_y,
            this.points,
            this.parent.r_scaleX, this.parent.r_scaleY,
            this.parent.r_sin, this.parent.r_cos,
        );
    }
}
