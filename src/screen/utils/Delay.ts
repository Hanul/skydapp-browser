import { SkyUtil } from "skydapp-common";
import GameNode from "../gamenode/GameNode";

export default class Delay {

    private after = 0;

    constructor(
        private parent: GameNode,
        private callback: () => void,
        private ms: number,
    ) {
        this.resume();
    }

    public resume(): void {
        if (this.parent.delays.includes(this) !== true) {
            this.parent.delays.push(this);
        }
    }

    public pause(): void {
        SkyUtil.pull(this.parent.delays, this);
    }

    public delete(): void {
        this.pause();
    }

    public step(deltaTime: number): void {
        this.after += deltaTime;
        if (this.after >= this.ms) {
            this.callback();
            this.delete();
        }
    }
}
