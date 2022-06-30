import GameNode from "../GameNode";
export default class SpriteNode extends GameNode {
    private cropX?;
    private cropY?;
    private cropWidth?;
    private cropHight?;
    frameWidth?: number | undefined;
    frameHeight?: number | undefined;
    private fps?;
    private pixiSprites;
    private frameSprite;
    private frameCount;
    private rawFrame;
    private frame;
    constructor(x: number, y: number, src: string, cropX?: number | undefined, cropY?: number | undefined, cropWidth?: number | undefined, cropHight?: number | undefined, frameWidth?: number | undefined, frameHeight?: number | undefined, fps?: number | undefined);
    private changeImage;
    set src(src: string);
    step(deltaTime: number, x: number, y: number, scaleX: number, scaleY: number, angle: number, sin: number, cos: number, alpha: number, hidden: boolean): void;
}
//# sourceMappingURL=SpriteNode.d.ts.map