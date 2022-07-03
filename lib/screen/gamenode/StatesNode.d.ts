import GameNode from "./GameNode";
export default class StatesNode<SN extends GameNode = GameNode> extends GameNode {
    currentStateNode: SN | undefined;
    private states;
    constructor(x: number, y: number, states?: {
        [state: string]: SN | undefined;
    }, baseState?: string);
    addState(state: string, node: SN): void;
    changeState(state: string, animationendHandler?: () => void): void;
    existsState(state: string): boolean;
    set state(state: string);
}
//# sourceMappingURL=StatesNode.d.ts.map