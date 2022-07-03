import * as PIXI from "pixi.js";
import { SkyUtil } from "skydapp-common";
import TextureLoader from "../../utils/TextureLoader";
import GameNode from "../GameNode";

export default class SpriteNode extends GameNode {

    private pixiSprites: PIXI.Sprite[] = [];
    private frameSprite: PIXI.Sprite | undefined;

    private frameCount: number | undefined;
    private rawFrame = 0;
    private frame: number | undefined;

    constructor(
        x: number, y: number, src: string,
        private cropX?: number,
        private cropY?: number,
        private cropWidth?: number,
        private cropHight?: number,
        public frameWidth?: number,
        public frameHeight?: number,
        private fps?: number,
    ) {
        super(x, y);
        this.src = src;
    }

    private async changeImage(src: string) {
        const texture = await TextureLoader.load(src);
        if (this.cropX === undefined) { this.cropX = 0; }
        if (this.cropY === undefined) { this.cropY = 0; }
        if (this.cropWidth === undefined) { this.cropWidth = texture.width; }
        if (this.cropHight === undefined) { this.cropHight = texture.height; }
        if (this.frameWidth === undefined) { this.frameWidth = this.cropWidth; }
        if (this.frameHeight === undefined) { this.frameHeight = this.cropHight; }

        this.frameCount = this.cropWidth * this.cropHight / this.frameWidth / this.frameHeight;
        const rowFrameCount = this.cropWidth / this.frameWidth;

        SkyUtil.repeat(this.frameCount, (frameIndex) => {

            const x = this.cropX! + (frameIndex % rowFrameCount) * this.frameWidth!;
            const y = this.cropY! + Math.floor(frameIndex / rowFrameCount) * this.frameHeight!;

            const frameSrc = `${src}:${x},${y}`;

            let frameTexture;
            if (PIXI.utils.TextureCache[frameSrc] !== undefined) {
                frameTexture = PIXI.utils.TextureCache[frameSrc];
            } else {
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

    public set src(src: string) {
        this.changeImage(src);
    }

    public step(
        deltaTime: number,
        x: number, y: number, scaleX: number, scaleY: number, angle: number, sin: number, cos: number, alpha: number, hidden: boolean,
    ): void {
        if (
            hidden !== true &&
            this.pixiContainer.visible === true &&
            this.pixiSprites.length > 0
        ) {

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
