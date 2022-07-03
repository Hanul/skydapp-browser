import * as PIXI from "pixi.js";
import DomNode from "../../dom/DomNode";
import SkyNode from "../../dom/SkyNode";
import Screen from "../Screen";
import Delay from "../utils/Delay";
import Area from "../area/Area";
export default class GameNode extends SkyNode {
    pixiContainer: PIXI.Container;
    private _screen;
    private _dom;
    protected children: GameNode[];
    private touchAreas;
    delays: Delay[];
    constructor(x: number, y: number);
    set x(x: number);
    get x(): number;
    set y(y: number);
    get y(): number;
    set z(z: number);
    get z(): number;
    yToZ: boolean;
    move(x: number, y: number): void;
    set centerX(x: number);
    get centerX(): number;
    set centerY(y: number);
    get centerY(): number;
    changeCenter(x: number, y: number): void;
    set scaleX(scale: number);
    get scaleX(): number;
    set scaleY(scale: number);
    get scaleY(): number;
    set scale(scale: number);
    get scale(): number;
    set angle(angle: number);
    get angle(): number;
    set alpha(alpha: number);
    get alpha(): number;
    addTouchArea(area: Area): void;
    showTouchArea(): void;
    checkTouch(x: number, y: number, eventName: string): boolean;
    set screen(screen: Screen | undefined);
    get screen(): Screen | undefined;
    set dom(dom: DomNode | undefined);
    get dom(): DomNode | undefined;
    private toX;
    private toY;
    private speedX;
    private speedY;
    private moveendHandler;
    moveTo(x: number, y: number, speed: number, moveendHandler?: () => void): void;
    private toAlpha;
    private fadingSpeed;
    private fadeendHandler;
    fadeIn(speed: number, fadeendHandler?: () => void): void;
    fadeOut(speed: number, fadeendHandler?: () => void): void;
    hide(): void;
    show(): void;
    r_x: number;
    r_y: number;
    r_scaleX: number;
    r_scaleY: number;
    r_angle: number;
    r_sin: number;
    r_cos: number;
    r_alpha: number;
    r_hidden: boolean;
    private dom_left;
    private dom_top;
    private dom_scaleX;
    private dom_scaleY;
    private dom_angle;
    private dom_alpha;
    step(deltaTime: number, x: number, y: number, scaleX: number, scaleY: number, angle: number, sin: number, cos: number, alpha: number, hidden: boolean): void;
    updateDomPosition(conditional?: boolean): void;
    appendTo(node: GameNode, index?: number): this;
    delete(): void;
}
//# sourceMappingURL=GameNode.d.ts.map