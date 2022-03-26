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
const DomNode_1 = __importDefault(require("../dom/DomNode"));
const el_1 = __importDefault(require("../dom/el"));
const Camera_1 = __importDefault(require("./Camera"));
const GameNode_1 = __importDefault(require("./gamenode/GameNode"));
class Screen extends DomNode_1.default {
    constructor(width, height, antialias, fps) {
        super(document.createElement("div"));
        this.width = width;
        this.height = height;
        this.camera = new Camera_1.default();
        this.root = new GameNode_1.default(0, 0);
        this.left = 0;
        this.top = 0;
        this.ratio = 0;
        this.beforeTime = 0;
        this.timeSigma = 0;
        this.tic = (now) => {
            const deltaTime = now - this.beforeTime;
            if (deltaTime > 0) {
                if (this.fps !== undefined && this.fps > 0) {
                    this.timeSigma += deltaTime;
                    const frameSecond = 1000 / this.fps;
                    if (this.timeSigma >= frameSecond) {
                        this.step(frameSecond);
                        this.timeSigma -= frameSecond;
                    }
                }
                else {
                    this.step(deltaTime);
                }
                this.beforeTime = now;
            }
            this.animationInterval = requestAnimationFrame(this.tic);
        };
        this.append(this.canvas = (0, el_1.default)("canvas"));
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
        this.canvas.onDom("click", (event) => {
            const rect = this.canvas.rect;
            this.root.checkTouch(event.clientX - rect.left - rect.width / 2 + this.camera.x, event.clientY - rect.top - rect.height / 2 + this.camera.y, "click");
        });
    }
    get centerX() {
        return this.width / 2;
    }
    get centerY() {
        return this.height / 2;
    }
    resize(width, height, ratio = 1) {
        this.canvas.style({ width: width * ratio, height: height * ratio });
        this.canvas.domElement.width = width;
        this.canvas.domElement.height = height;
        this.renderer.resize(width, height);
        this.width = width;
        this.height = height;
        this.ratio = ratio;
    }
    step(deltaTime) {
        this.root.x = this.width / 2 - this.camera.x;
        this.root.y = this.height / 2 - this.camera.y;
        this.root.step(deltaTime, -this.root.x, -this.root.y, 1, 1, 0, 0, 1, 1);
        this.renderer.render(this.root.pixiContainer);
    }
    resume() {
        if (this.animationInterval === undefined) {
            this.beforeTime = performance.now();
            this.animationInterval = requestAnimationFrame(this.tic);
        }
    }
}
exports.default = Screen;
Screen.FPS_WINDOW_BLURRED = 1;
//# sourceMappingURL=Screen.js.map