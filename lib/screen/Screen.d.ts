import DomNode from "../dom/DomNode";
import Camera from "./Camera";
import GameNode from "./gamenode/GameNode";
export default class Screen extends DomNode<HTMLDivElement> {
    width: number;
    height: number;
    private static readonly FPS_WINDOW_BLURRED;
    canvas: DomNode<HTMLCanvasElement>;
    private renderer;
    camera: Camera;
    root: GameNode;
    left: number;
    top: number;
    ratio: number;
    private animationInterval;
    private beforeTime;
    private timeSigma;
    private fps;
    constructor(width: number, height: number, antialias?: boolean, fps?: number);
    get centerX(): number;
    get centerY(): number;
    resize(width: number, height: number, ratio?: number): void;
    private step;
    private tic;
    resume(): void;
}
//# sourceMappingURL=Screen.d.ts.map