import * as PIXI from "pixi.js";
import DomNode from "../dom/DomNode";
import el from "../dom/el";
import Camera from "./Camera";
import GameNode from "./gamenode/GameNode";

export default class Screen extends DomNode<HTMLDivElement> {
    private static readonly FPS_WINDOW_BLURRED = 1;

    public canvas: DomNode<HTMLCanvasElement>;
    private renderer: PIXI.Renderer;

    public camera = new Camera();
    public root = new GameNode(0, 0);

    public left = 0;
    public top = 0;
    public ratio = 0;

    private animationInterval: number | undefined;
    private beforeTime = 0;
    private timeSigma = 0;
    private fps: number | undefined;

    constructor(
        public width: number,
        public height: number,
        antialias?: boolean,
        fps?: number,
    ) {
        super(document.createElement("div"));
        this.append(this.canvas = el("canvas"));
        this.renderer = new PIXI.Renderer({
            view: this.canvas.domElement,
            transparent: true,
            resolution: devicePixelRatio,
            antialias,
        });
        this.renderer.plugins.interaction.autoPreventDefault = false;
        this.resize(width, height);
        this.root.screen = this;
        this.resume();

        this.canvas.onDom("click", (event: MouseEvent) => {
            const rect = this.canvas.rect;
            this.root.checkTouch(
                event.clientX - rect.left - rect.width / 2 + this.camera.x,
                event.clientY - rect.top - rect.height / 2 + this.camera.y,
                "click",
            );
        });
    }

    public get centerX() {
        return this.width / 2;
    }

    public get centerY() {
        return this.height / 2;
    }

    public resize(width: number, height: number, ratio = 1): void {
        this.canvas.style({ width: width * ratio, height: height * ratio });
        this.canvas.domElement.width = width;
        this.canvas.domElement.height = height;
        this.renderer.resize(width, height);
        this.width = width;
        this.height = height;
        this.ratio = ratio;
    }

    private step(deltaTime: number) {

        // root to center of screen
        this.root.x = this.width / 2 - this.camera.x;
        this.root.y = this.height / 2 - this.camera.y;
        this.root.step(deltaTime, -this.root.x, -this.root.y, 1, 1, 0, 0, 1, 1);

        this.renderer.render(this.root.pixiContainer);
    }

    private tic = (now: number) => {
        const deltaTime = now - this.beforeTime;
        if (deltaTime > 0) {
            if (this.fps !== undefined && this.fps > 0) {
                this.timeSigma += deltaTime;
                const frameSecond = 1000 / this.fps;
                if (this.timeSigma >= frameSecond) {
                    this.step(frameSecond);
                    this.timeSigma -= frameSecond;
                }
            } else {
                this.step(deltaTime);
            }
            this.beforeTime = now;
        }
        this.animationInterval = requestAnimationFrame(this.tic);
    };

    public resume(): void {
        if (this.animationInterval === undefined) {
            this.beforeTime = performance.now();
            this.animationInterval = requestAnimationFrame(this.tic);
        }
    }
}
