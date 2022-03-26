"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BodyNode_1 = __importDefault(require("../dom/BodyNode"));
const Letterbox_1 = __importDefault(require("./Letterbox"));
const Screen_1 = __importDefault(require("./Screen"));
class Fullscreen extends Screen_1.default {
    constructor(options) {
        super((options === null || options === void 0 ? void 0 : options.width) === undefined ? 0 : options.width, (options === null || options === void 0 ? void 0 : options.height) === undefined ? 0 : options.height, (options === null || options === void 0 ? void 0 : options.antialias) === true, options === null || options === void 0 ? void 0 : options.fps);
        this.options = options;
        this.ratio = 1;
        this.letterboxes = {
            top: new Letterbox_1.default(), bottom: new Letterbox_1.default(),
            left: new Letterbox_1.default(), right: new Letterbox_1.default(),
        };
        this.windowResizeHandler = () => {
            var _a, _b, _c, _d, _e, _f;
            const winWidth = document.documentElement.clientWidth;
            const winHeight = window.innerHeight;
            let isToFixWidth = false;
            let isToFixHeight = false;
            if (((_a = this.options) === null || _a === void 0 ? void 0 : _a.width) === undefined) {
                this.width = winWidth;
                isToFixWidth = true;
            }
            if (((_b = this.options) === null || _b === void 0 ? void 0 : _b.height) === undefined) {
                this.height = winHeight;
                isToFixHeight = true;
            }
            let widthRatio = winWidth / this.width;
            let heightRatio = winHeight / this.height;
            if (widthRatio < heightRatio) {
                this.ratio = widthRatio;
            }
            else {
                this.ratio = heightRatio;
            }
            if (((_c = this.options) === null || _c === void 0 ? void 0 : _c.minWidth) !== undefined && this.width / this.ratio < this.options.minWidth) {
                this.width = this.options.minWidth;
                isToFixWidth = false;
            }
            if (((_d = this.options) === null || _d === void 0 ? void 0 : _d.minHeight) !== undefined && this.height / this.ratio < this.options.minHeight) {
                this.height = this.options.minHeight;
                isToFixHeight = false;
            }
            widthRatio = winWidth / this.width;
            heightRatio = winHeight / this.height;
            if (widthRatio < heightRatio) {
                this.ratio = widthRatio;
            }
            else {
                this.ratio = heightRatio;
            }
            if (isToFixWidth === true) {
                this.width /= this.ratio;
            }
            if (isToFixHeight === true) {
                this.height /= this.ratio;
            }
            if (((_e = this.options) === null || _e === void 0 ? void 0 : _e.maxWidth) !== undefined && this.width > this.options.maxWidth) {
                this.width = this.options.maxWidth;
            }
            if (((_f = this.options) === null || _f === void 0 ? void 0 : _f.maxHeight) !== undefined && this.height > this.options.maxHeight) {
                this.height = this.options.maxHeight;
            }
            this.left = (winWidth - this.width * this.ratio) / 2;
            this.top = (winHeight - this.height * this.ratio) / 2;
            this.canvas.style({ left: this.left, top: this.top });
            this.resize(this.width, this.height, this.ratio);
            this.letterboxes.left.style({ width: this.left });
            this.letterboxes.top.style({ height: this.top });
            this.letterboxes.right.style({ width: this.left });
            this.letterboxes.bottom.style({ height: this.top });
        };
        this.style({ position: "fixed", left: 0, top: 0, width: "100%", height: "100%" });
        this.canvas.style({ position: "fixed", zIndex: -1 });
        this.append(...Object.values(this.letterboxes));
        this.letterboxes.top.style({ left: 0, top: 0, width: "100%" });
        this.letterboxes.bottom.style({ left: 0, bottom: 0, width: "100%" });
        this.letterboxes.left.style({ left: 0, top: 0, height: "100%" });
        this.letterboxes.right.style({ right: 0, top: 0, height: "100%" });
        window.addEventListener("resize", this.windowResizeHandler);
        this.windowResizeHandler();
        BodyNode_1.default.append(this);
    }
    delete() {
        window.removeEventListener("resize", this.windowResizeHandler);
        super.delete();
    }
}
exports.default = Fullscreen;
//# sourceMappingURL=Fullscreen.js.map