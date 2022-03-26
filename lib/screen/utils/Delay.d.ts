import GameNode from "../gamenode/GameNode";
export default class Delay {
    private parent;
    private callback;
    private ms;
    private after;
    constructor(parent: GameNode, callback: () => void, ms: number);
    resume(): void;
    pause(): void;
    delete(): void;
    step(deltaTime: number): void;
}
//# sourceMappingURL=Delay.d.ts.map