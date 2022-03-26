"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PIXI = __importStar(require("pixi.js"));
const SkyNode_1 = __importDefault(require("../../dom/SkyNode"));
class GameNode extends SkyNode_1.default {
    constructor(x, y) {
        super();
        this.children = [];
        this.touchAreas = [];
        this.delays = [];
        this.yToZ = false;
        this.speedX = 0;
        this.speedY = 0;
        this.r_x = 0;
        this.r_y = 0;
        this.r_scaleX = 1;
        this.r_scaleY = 1;
        this.r_angle = 0;
        this.r_sin = 0;
        this.r_cos = 1;
        this.r_alpha = 1;
        this.dom_left = 0;
        this.dom_top = 0;
        this.dom_scaleX = 1;
        this.dom_scaleY = 1;
        this.dom_angle = 0;
        this.dom_alpha = 1;
        this.pixiContainer = new PIXI.Container();
        this.pixiContainer.sortableChildren = true;
        this.x = x;
        this.y = y;
    }
    set x(x) { this.pixiContainer.x = x; }
    get x() { return this.pixiContainer.x; }
    set y(y) {
        this.pixiContainer.y = y;
        if (this.yToZ === true) {
            this.z = y;
        }
    }
    get y() { return this.pixiContainer.y; }
    set z(z) { this.pixiContainer.zIndex = z; }
    get z() { return this.pixiContainer.zIndex; }
    move(x, y) {
        this.pixiContainer.x = x;
        this.pixiContainer.y = y;
    }
    set centerX(x) { this.pixiContainer.pivot.x = x; }
    get centerX() { return this.pixiContainer.pivot.x; }
    set centerY(y) { this.pixiContainer.pivot.y = y; }
    get centerY() { return this.pixiContainer.pivot.y; }
    changeCenter(x, y) {
        this.pixiContainer.pivot.x = x;
        this.pixiContainer.pivot.y = y;
    }
    set scaleX(scale) { this.pixiContainer.scale.x = scale; }
    get scaleX() { return this.pixiContainer.scale.x; }
    set scaleY(scale) { this.pixiContainer.scale.y = scale; }
    get scaleY() { return this.pixiContainer.scale.y; }
    set scale(scale) {
        this.pixiContainer.scale.x = scale;
        this.pixiContainer.scale.y = scale;
    }
    get scale() { return this.pixiContainer.scale.x; }
    set angle(angle) { this.pixiContainer.angle = angle; }
    get angle() { return this.pixiContainer.angle; }
    set alpha(alpha) { this.pixiContainer.alpha = alpha; }
    get alpha() { return this.pixiContainer.alpha; }
    addTouchArea(area) {
        this.touchAreas.push(area);
        area.parent = this;
    }
    showTouchArea() {
        for (const touchArea of this.touchAreas) {
            this.pixiContainer.addChild(touchArea.getPixiGraphics(0xFF00FF));
        }
    }
    checkTouch(x, y, eventName) {
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
    set screen(screen) {
        var _a;
        if (this.screen === undefined && screen !== undefined) {
            (_a = this.dom) === null || _a === void 0 ? void 0 : _a.appendTo(screen);
        }
        this._screen = screen;
        for (const child of this.children) {
            if (child instanceof GameNode) {
                child.screen = this.screen;
            }
        }
    }
    get screen() { return this._screen; }
    set dom(dom) {
        var _a;
        (_a = this._dom) === null || _a === void 0 ? void 0 : _a.delete();
        if (dom !== undefined) {
            this._dom = dom;
            dom.style({
                position: "fixed",
                opacity: this.pixiContainer.worldAlpha,
            });
            dom.on("delete", () => this._dom = undefined);
            if (this.screen !== undefined) {
                dom.appendTo(this.screen);
            }
        }
    }
    get dom() { return this._dom; }
    moveTo(x, y, speed, moveendHandler) {
        this.toX = x;
        this.toY = y;
        const dx = x - this.x;
        const dy = y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        this.speedX = speed * dx / distance;
        this.speedY = speed * dy / distance;
        this.moveendHandler = moveendHandler;
    }
    step(deltaTime, x, y, scaleX, scaleY, angle, sin, cos, alpha) {
        var _a;
        this.x += this.speedX * deltaTime;
        if (this.toX !== undefined) {
            if ((this.speedX > 0 && this.x > this.toX) ||
                (this.speedX < 0 && this.x < this.toX)) {
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
            if ((this.speedY > 0 && this.y > this.toY) ||
                (this.speedY < 0 && this.y < this.toY)) {
                this.y = this.toY;
                this.toY = undefined;
                this.speedY = 0;
                if (this.moveendHandler !== undefined) {
                    this.moveendHandler();
                    this.moveendHandler = undefined;
                }
            }
        }
        this.r_x = x + this.x;
        this.r_y = y + this.y;
        if (((_a = this.screen) === null || _a === void 0 ? void 0 : _a.camera.target) === this) {
            this.screen.camera.x = this.r_x;
            this.screen.camera.y = this.r_y;
        }
        this.r_scaleX = scaleX * this.scaleX;
        this.r_scaleY = scaleY * this.scaleY;
        this.r_angle = angle + this.angle;
        this.r_alpha = alpha * this.alpha;
        for (const child of this.children) {
            child.step(deltaTime, this.r_x, this.r_y, this.r_scaleX, this.r_scaleY, this.r_angle, this.r_sin, this.r_cos, this.r_alpha);
        }
        for (const delay of this.delays) {
            delay.step(deltaTime);
        }
        if (this.dom !== undefined && this.screen !== undefined) {
            const dom_left = this.screen.left + (this.screen.width / 2 + this.r_x - this.centerX - this.screen.camera.x) * this.screen.ratio;
            const dom_top = this.screen.top + (this.screen.height / 2 + this.r_y - this.centerY - this.screen.camera.y) * this.screen.ratio;
            const dom_scaleX = this.screen.ratio * this.r_scaleX;
            const dom_scaleY = this.screen.ratio * this.r_scaleY;
            if (dom_left !== this.dom_left ||
                dom_top !== this.dom_top ||
                dom_scaleX !== this.dom_scaleX ||
                dom_scaleY !== this.dom_scaleY ||
                this.r_angle !== this.dom_angle ||
                this.r_alpha !== this.dom_alpha) {
                const rect = this.dom.rect;
                this.dom.style({
                    left: dom_left - rect.width / 2,
                    top: dom_top - rect.height / 2,
                    transform: `scale(${dom_scaleX}, ${dom_scaleY})`,
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
    appendTo(node, index) {
        var _a;
        if (index !== undefined && index < node.children.length) {
            node.pixiContainer.addChildAt(this.pixiContainer, index);
        }
        else {
            node.pixiContainer.addChild(this.pixiContainer);
        }
        this.screen = node.screen;
        if (this.screen !== undefined) {
            (_a = this.dom) === null || _a === void 0 ? void 0 : _a.appendTo(this.screen);
        }
        return super.appendTo(node, index);
    }
    delete() {
        var _a;
        this.pixiContainer.destroy();
        (_a = this.dom) === null || _a === void 0 ? void 0 : _a.delete();
        for (const delay of this.delays) {
            delay.delete();
        }
        super.delete();
    }
}
exports.default = GameNode;
//# sourceMappingURL=GameNode.js.map