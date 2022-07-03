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
const skydapp_common_1 = require("skydapp-common");
const TextureLoader_1 = __importDefault(require("../../utils/TextureLoader"));
const GameNode_1 = __importDefault(require("../GameNode"));
class SpriteNode extends GameNode_1.default {
    constructor(x, y, src, cropX, cropY, cropWidth, cropHight, frameWidth, frameHeight, fps) {
        super(x, y);
        this.cropX = cropX;
        this.cropY = cropY;
        this.cropWidth = cropWidth;
        this.cropHight = cropHight;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.fps = fps;
        this.pixiSprites = [];
        this.rawFrame = 0;
        this.src = src;
    }
    async changeImage(src) {
        const texture = await TextureLoader_1.default.load(src);
        if (this.cropX === undefined) {
            this.cropX = 0;
        }
        if (this.cropY === undefined) {
            this.cropY = 0;
        }
        if (this.cropWidth === undefined) {
            this.cropWidth = texture.width;
        }
        if (this.cropHight === undefined) {
            this.cropHight = texture.height;
        }
        if (this.frameWidth === undefined) {
            this.frameWidth = this.cropWidth;
        }
        if (this.frameHeight === undefined) {
            this.frameHeight = this.cropHight;
        }
        this.frameCount = this.cropWidth * this.cropHight / this.frameWidth / this.frameHeight;
        const rowFrameCount = this.cropWidth / this.frameWidth;
        skydapp_common_1.SkyUtil.repeat(this.frameCount, (frameIndex) => {
            const x = this.cropX + (frameIndex % rowFrameCount) * this.frameWidth;
            const y = this.cropY + Math.floor(frameIndex / rowFrameCount) * this.frameHeight;
            const frameSrc = `${src}:${x},${y}`;
            let frameTexture;
            if (PIXI.utils.TextureCache[frameSrc] !== undefined) {
                frameTexture = PIXI.utils.TextureCache[frameSrc];
            }
            else {
                frameTexture = new PIXI.Texture(texture.baseTexture, new PIXI.Rectangle(x, y, this.frameWidth, this.frameHeight));
                PIXI.Texture.addToCache(frameTexture, frameSrc);
            }
            const pixiSprite = PIXI.Sprite.from(frameTexture);
            pixiSprite.anchor.x = 0.5;
            pixiSprite.anchor.y = 0.5;
            this.pixiSprites[frameIndex] = pixiSprite;
        });
        setTimeout(() => {
            if (this.deleted !== true) {
                this.fireEvent("load");
            }
        });
    }
    set src(src) {
        this.changeImage(src);
    }
    step(deltaTime, x, y, scaleX, scaleY, angle, sin, cos, alpha, hidden) {
        if (hidden !== true &&
            this.pixiContainer.visible === true &&
            this.pixiSprites.length > 0) {
            if (this.fps !== undefined && this.fps > 0) {
                this.rawFrame += this.fps * deltaTime / 1000;
            }
            if (this.frameCount !== undefined && this.rawFrame >= this.frameCount) {
                this.rawFrame %= this.frameCount;
            }
            const frame = Math.floor(this.rawFrame);
            if (this.frame !== frame) {
                this.frame = frame;
                if (this.frameSprite !== undefined) {
                    this.pixiContainer.removeChild(this.frameSprite);
                }
                this.frameSprite = this.pixiSprites[this.frame];
                if (this.frameSprite !== undefined) {
                    this.pixiContainer.addChild(this.frameSprite);
                }
            }
        }
        super.step(deltaTime, x, y, scaleX, scaleY, angle, sin, cos, alpha, hidden);
    }
}
exports.default = SpriteNode;
//# sourceMappingURL=SpriteNode.js.map