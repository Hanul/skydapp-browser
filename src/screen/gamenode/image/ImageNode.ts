import * as PIXI from "pixi.js";
import TextureLoader from "../../utils/TextureLoader";
import GameNode from "../GameNode";

export default class ImageNode extends GameNode {

    constructor(x: number, y: number, src: string) {
        super(x, y);
        this.src = src;
    }

    private async changeImage(src: string) {
        const texture = await TextureLoader.load(src);
        const pixiSprite = PIXI.Sprite.from(texture);
        pixiSprite.anchor.x = 0.5;
        pixiSprite.anchor.y = 0.5;
        this.pixiContainer.addChild(pixiSprite);
        if (this.deleted !== true) {
            this.fireEvent("load");
        }
    }

    public set src(src: string) {
        this.changeImage(src);
    }
}
