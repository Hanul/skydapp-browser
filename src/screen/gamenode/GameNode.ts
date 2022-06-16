import * as PIXI from "pixi.js";
import DomNode from "../../dom/DomNode";
import SkyNode from "../../dom/SkyNode";
import Screen from "../Screen";
import Delay from "../utils/Delay";
import Area from "./area/Area";

export default class GameNode extends SkyNode {

    public pixiContainer: PIXI.Container;
    private _screen: Screen | undefined;
    private _dom: DomNode | undefined;

    protected children: GameNode[] = [];
    private touchAreas: Area[] = [];
    public delays: Delay[] = [];

    constructor(x: number, y: number) {
        super();
        this.pixiContainer = new PIXI.Container();
        this.pixiContainer.sortableChildren = true;
        this.x = x;
        this.y = y;
    }

    public set x(x: number) { this.pixiContainer.x = x; }
    public get x(): number { return this.pixiContainer.x; }
    public set y(y: number) {
        this.pixiContainer.y = y;
        if (this.yToZ === true) {
            this.z = y;
        }
    }
    public get y(): number { return this.pixiContainer.y; }
    public set z(z: number) { this.pixiContainer.zIndex = z; }
    public get z(): number { return this.pixiContainer.zIndex; }

    public yToZ = false;

    public move(x: number, y: number): void {
        this.pixiContainer.x = x;
        this.pixiContainer.y = y;
    }

    public set centerX(x: number) { this.pixiContainer.pivot.x = x; }
    public get centerX(): number { return this.pixiContainer.pivot.x; }
    public set centerY(y: number) { this.pixiContainer.pivot.y = y; }
    public get centerY(): number { return this.pixiContainer.pivot.y; }

    public changeCenter(x: number, y: number): void {
        this.pixiContainer.pivot.x = x;
        this.pixiContainer.pivot.y = y;
    }

    public set scaleX(scale: number) { this.pixiContainer.scale.x = scale; }
    public get scaleX(): number { return this.pixiContainer.scale.x; }
    public set scaleY(scale: number) { this.pixiContainer.scale.y = scale; }
    public get scaleY(): number { return this.pixiContainer.scale.y; }

    public set scale(scale: number) {
        this.pixiContainer.scale.x = scale;
        this.pixiContainer.scale.y = scale;
    }
    public get scale(): number { return this.pixiContainer.scale.x; }

    public set angle(angle: number) { this.pixiContainer.angle = angle; }
    public get angle(): number { return this.pixiContainer.angle; }

    public set alpha(alpha: number) { this.pixiContainer.alpha = alpha; }
    public get alpha(): number { return this.pixiContainer.alpha; }

    public addTouchArea(area: Area): void {
        this.touchAreas.push(area);
        area.parent = this;
    }

    public showTouchArea(): void {
        for (const touchArea of this.touchAreas) {
            this.pixiContainer.addChild(touchArea.getPixiGraphics(0xFF00FF));
        }
    }

    public checkTouch(x: number, y: number, eventName: string): boolean {
        for (const touchArea of this.touchAreas) {
            if (touchArea.checkPoint(x, y) === true) {
                this.fireEvent(eventName, x, y);
                return true;
            }
        }
        for (const child of this.children) {
            if (child.checkTouch(x, y, eventName) === true) {
                this.fireEvent(eventName, x, y);
                return true;
            }
        }
        return false;
    }

    public set screen(screen: Screen | undefined) {
        if (this.screen === undefined && screen !== undefined) {
            this.dom?.appendTo(screen);
        }
        this._screen = screen;
        for (const child of this.children) {
            if (child instanceof GameNode) {
                child.screen = this.screen;
            }
        }
    }

    public get screen(): Screen | undefined { return this._screen; }

    public set dom(dom: DomNode | undefined) {
        this._dom?.delete();
        if (dom !== undefined) {
            this._dom = dom;
            dom.style({
                position: "fixed",
                left: -9999999,
                top: -9999999,
                opacity: this.pixiContainer.worldAlpha,
            });
            dom.on("delete", () => this._dom = undefined);
            if (this.screen !== undefined) {
                dom.appendTo(this.screen);
            }
        }
    }

    public get dom(): DomNode | undefined { return this._dom; }

    private toX: number | undefined;
    private toY: number | undefined;
    private speedX = 0;
    private speedY = 0;
    private moveendHandler: (() => void) | undefined;

    public moveTo(x: number, y: number, speed: number, moveendHandler?: () => void): void {
        this.toX = x;
        this.toY = y;
        const dx = x - this.x;
        const dy = y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        this.speedX = speed * dx / distance;
        this.speedY = speed * dy / distance;
        this.moveendHandler = moveendHandler;
    }

    private toAlpha: number | undefined;
    private fadingSpeed = 0;
    private fadeendHandler: (() => void) | undefined;

    public fadeIn(speed: number, fadeendHandler?: () => void): void {
        if (this.alpha === 1) {
            this.alpha = 0;
        }
        this.toAlpha = 1;
        this.fadingSpeed = speed;
        this.fadeendHandler = fadeendHandler;
    }

    public fadeOut(speed: number, fadeendHandler?: () => void): void {
        this.toAlpha = 0;
        this.fadingSpeed = -speed;
        this.fadeendHandler = fadeendHandler;
    }

    public r_x = 0;
    public r_y = 0;
    public r_scaleX = 1;
    public r_scaleY = 1;
    public r_angle = 0;
    public r_sin = 0;
    public r_cos = 1;
    public r_alpha = 1;

    private dom_left = 0;
    private dom_top = 0;
    private dom_scaleX = 1;
    private dom_scaleY = 1;
    private dom_angle = 0;
    private dom_alpha = 1;

    public step(
        deltaTime: number,
        x: number, y: number, scaleX: number, scaleY: number, angle: number, sin: number, cos: number, alpha: number,
    ): void {

        this.x += this.speedX * deltaTime;
        if (this.toX !== undefined) {
            if (
                (this.speedX > 0 && this.x > this.toX) ||
                (this.speedX < 0 && this.x < this.toX)
            ) {
                this.x = this.toX;
                this.toX = undefined;
                this.speedX = 0;
                if (this.moveendHandler !== undefined) {
                    this.moveendHandler();
                    this.moveendHandler = undefined;
                }
            }
        }

        this.y += this.speedY * deltaTime;
        if (this.toY !== undefined) {
            if (
                (this.speedY > 0 && this.y > this.toY) ||
                (this.speedY < 0 && this.y < this.toY)
            ) {
                this.y = this.toY;
                this.toY = undefined;
                this.speedY = 0;
                if (this.moveendHandler !== undefined) {
                    this.moveendHandler();
                    this.moveendHandler = undefined;
                }
            }
        }

        this.alpha += this.fadingSpeed * deltaTime;
        if (this.toAlpha !== undefined) {
            if (
                (this.fadingSpeed > 0 && this.alpha > this.toAlpha) ||
                (this.fadingSpeed < 0 && this.alpha < this.toAlpha)
            ) {
                this.alpha = this.toAlpha;
                this.toAlpha = undefined;
                this.fadingSpeed = 0;
                if (this.fadeendHandler !== undefined) {
                    this.fadeendHandler();
                    this.fadeendHandler = undefined;
                }
            }
        }

        if (this.deleted !== true) {

            this.r_x = x + this.x;
            this.r_y = y + this.y;
            if (this.screen?.camera.target === this) {
                this.screen.camera.x = this.r_x;
                this.screen.camera.y = this.r_y;
            }

            this.r_scaleX = scaleX * this.scaleX;
            this.r_scaleY = scaleY * this.scaleY;
            this.r_angle = angle + this.angle;
            this.r_alpha = alpha * this.alpha;

            for (const child of this.children) { child.step(deltaTime, this.r_x, this.r_y, this.r_scaleX, this.r_scaleY, this.r_angle, this.r_sin, this.r_cos, this.r_alpha); }
            for (const delay of this.delays) { delay.step(deltaTime); }

            if (this.dom !== undefined && this.screen !== undefined) {
                const dom_left = this.screen.left + (this.screen.width / 2 + this.r_x - this.centerX - this.screen.camera.x) * this.screen.ratio;
                const dom_top = this.screen.top + (this.screen.height / 2 + this.r_y - this.centerY - this.screen.camera.y) * this.screen.ratio;
                const dom_scaleX = this.screen.ratio * this.r_scaleX;
                const dom_scaleY = this.screen.ratio * this.r_scaleY;
                if (
                    dom_left !== this.dom_left ||
                    dom_top !== this.dom_top ||
                    dom_scaleX !== this.dom_scaleX ||
                    dom_scaleY !== this.dom_scaleY ||
                    this.r_angle !== this.dom_angle ||
                    this.r_alpha !== this.dom_alpha
                ) {
                    const rect = this.dom.rect;
                    this.dom.style({
                        left: dom_left - rect.width / 2,
                        top: dom_top - rect.height / 2,
                        transform: `scale(${dom_scaleX}, ${dom_scaleY})`,
                        opacity: this.r_alpha,
                    });
                    this.dom_left = dom_left;
                    this.dom_top = dom_top;
                    this.dom_scaleX = dom_scaleX;
                    this.dom_scaleY = dom_scaleY;
                    this.dom_angle = this.r_angle;
                    this.dom_alpha = this.r_alpha;
                }
            }
        }
    }

    public appendTo(node: GameNode, index?: number): this {
        if (index !== undefined && index < node.children.length) {
            node.pixiContainer.addChildAt(this.pixiContainer, index);
        } else {
            node.pixiContainer.addChild(this.pixiContainer);
        }
        this.screen = node.screen;
        if (this.screen !== undefined) {
            this.dom?.appendTo(this.screen);
        }
        return super.appendTo(node, index);
    }

    public delete(): void {
        this.pixiContainer.destroy();
        this.dom?.delete();
        for (const delay of this.delays) {
            delay.delete();
        }
        super.delete();
    }
}
