import { AtlasAttachmentLoader, SkeletonJson, Skin as SpineSkin } from "@pixi-spine/runtime-4.0";
import { Spine as PIXISpine, TextureAtlas } from "pixi-spine";
import TextureLoader from "../../utils/TextureLoader";
import GameNode from "../GameNode";

export default class SpineNode extends GameNode {

    private pixiSpine: PIXISpine | undefined;
    private _animation: string | undefined;
    private _skins: string[] | undefined;

    constructor(x: number, y: number,
        private options: {
            json: string;
            atlas: string;
            png: string;
        },
    ) {
        super(x, y);
        this.load();
    }

    private async load() {

        const texture = await TextureLoader.load(this.options.png);
        const rawSkeletonData = await (await fetch(this.options.json)).text();
        const rawAtlasData = await (await fetch(this.options.atlas)).text();

        const spineAtlas = new TextureAtlas(rawAtlasData, (error, callback) => callback(texture.baseTexture as any));
        const spineAtlasLoader = new AtlasAttachmentLoader(spineAtlas);
        const spineJsonParser = new SkeletonJson(spineAtlasLoader);

        this.pixiSpine = new PIXISpine(spineJsonParser.readSkeletonData(rawSkeletonData));
        if (this.animation !== undefined) {
            this.pixiSpine.state.setAnimation(0, this.animation, true);
        }
        if (this.skins !== undefined) {
            this.changeSkins(this.skins);
        }

        this.pixiSpine.state.addListener({
            complete: () => this.fireEvent("animationend"),
        });
        this.pixiContainer.addChild(this.pixiSpine as any);
    }

    public set animation(animation: string | undefined) {
        if (animation !== undefined && this.pixiSpine !== undefined) {
            this.pixiSpine.state.setAnimation(0, animation, true);
            this.pixiSpine.state.apply(this.pixiSpine.skeleton);
        }
        this._animation = animation;
    }

    public get animation(): string | undefined {
        return this._animation;
    }

    private changeSkins(skins: string[]) {
        if (this.pixiSpine !== undefined) {
            const newSkin = new SpineSkin("combined-skin");
            for (const skinName of skins) {
                const skin = this.pixiSpine.spineData.findSkin(skinName);
                if (skin !== null) {
                    newSkin.addSkin(skin as any);
                }
            }
            this.pixiSpine.skeleton.skin = newSkin;
            this.pixiSpine.skeleton.setSlotsToSetupPose();
        }
    }

    public set skins(skins: string[] | undefined) {
        if (skins !== undefined) {
            this.changeSkins(skins);
        }
        this._skins = skins;
    }

    public get skins(): string[] | undefined {
        return this._skins;
    }
}
