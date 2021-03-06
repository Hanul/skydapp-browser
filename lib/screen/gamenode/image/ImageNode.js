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
const TextureLoader_1 = __importDefault(require("../../utils/TextureLoader"));
const GameNode_1 = __importDefault(require("../GameNode"));
class ImageNode extends GameNode_1.default {
    constructor(x, y, src) {
        super(x, y);
        this.src = src;
    }
    async changeImage(src) {
        const texture = await TextureLoader_1.default.load(src);
        const pixiSprite = PIXI.Sprite.from(texture);
        pixiSprite.anchor.x = 0.5;
        pixiSprite.anchor.y = 0.5;
        this.pixiContainer.addChild(pixiSprite);
        setTimeout(() => {
            if (this.deleted !== true) {
                this.fireEvent("load");
            }
        });
    }
    set src(src) {
        this.changeImage(src);
    }
}
exports.default = ImageNode;
//# sourceMappingURL=ImageNode.js.map