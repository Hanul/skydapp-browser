import GameNode from "./GameNode";

export default class StatesNode<SN extends GameNode = GameNode> extends GameNode {

    public currentStateNode: SN | undefined;
    private states: { [state: string]: SN } = {};

    constructor(x: number, y: number, states?: { [state: string]: SN | undefined }, baseState?: string) {
        super(x, y);

        if (states !== undefined) {
            for (const [state, node] of Object.entries(states)) {
                if (node !== undefined) {
                    this.addState(state, node);
                }
            }
        }

        if (baseState !== undefined) {
            this.state = baseState;
        }
    }

    public addState(state: string, node: SN) {
        this.states[state]?.delete();
        this.states[state] = node.appendTo(this);
        node.hide();
    }

    public changeState(state: string, animationendHandler?: () => void) {
        this.currentStateNode?.hide();
        this.currentStateNode = this.states[state];
        this.currentStateNode?.show();
    }

    public existsState(state: string) {
        return this.states[state] !== undefined;
    }

    public set state(state: string) {
        this.changeState(state);
    }
}
