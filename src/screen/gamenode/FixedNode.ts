import GameNode from "./GameNode";

export default class FixedNode extends GameNode {

    public step(
        deltaTime: number,
        x: number, y: number, scaleX: number, scaleY: number, angle: number, sin: number, cos: number, alpha: number, hidden: boolean,
    ): void {
        super.step(
            deltaTime,
            this.screen === undefined ? 0 : this.screen.camera.x,
            this.screen === undefined ? 0 : this.screen.camera.y,
            scaleX, scaleY, angle, sin, cos, alpha, hidden,
        );
    }
}
