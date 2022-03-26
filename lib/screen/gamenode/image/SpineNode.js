"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const runtime_4_0_1 = require("@pixi-spine/runtime-4.0");
const pixi_spine_1 = require("pixi-spine");
const TextureLoader_1 = __importDefault(require("../../utils/TextureLoader"));
const GameNode_1 = __importDefault(require("../GameNode"));
class SpineNode extends GameNode_1.default {
    constructor(x, y, options) {
        super(x, y);
        this.options = options;
        this.load();
    }
    async load() {
        const texture = await TextureLoader_1.default.load(this.options.png);
        const rawSkeletonData = await (await fetch(this.options.json)).text();
        const rawAtlasData = await (await fetch(this.options.atlas)).text();
        const spineAtlas = new pixi_spine_1.TextureAtlas(rawAtlasData, (error, callback) => callback(texture.baseTexture));
        const spineAtlasLoader = new runtime_4_0_1.AtlasAttachmentLoader(spineAtlas);
        const spineJsonParser = new runtime_4_0_1.SkeletonJson(spineAtlasLoader);
        this.pixiSpine = new pixi_spine_1.Spine(spineJsonParser.readSkeletonData(rawSkeletonData));
        if (this.animation !== undefined) {
            this.pixiSpine.state.setAnimation(0, this.animation, true);
        }
        if (this.skins !== undefined) {
            this.changeSkins(this.skins);
        }
        this.pixiSpine.state.addListener({
            complete: () => this.fireEvent("animationend"),
        });
        this.pixiContainer.addChild(this.pixiSpine);
    }
    set animation(animation) {
        if (animation !== undefined && this.pixiSpine !== undefined) {
            this.pixiSpine.state.setAnimation(0, animation, true);
            this.pixiSpine.state.apply(this.pixiSpine.skeleton);
        }
        this._animation = animation;
    }
    get animation() {
        return this._animation;
    }
    changeSkins(skins) {
        if (this.pixiSpine !== undefined) {
            const newSkin = new runtime_4_0_1.Skin("combined-skin");
            for (const skinName of skins) {
                const skin = this.pixiSpine.spineData.findSkin(skinName);
                if (skin !== null) {
                    newSkin.addSkin(skin);
                }
            }
            this.pixiSpine.skeleton.skin = newSkin;
            this.pixiSpine.skeleton.setSlotsToSetupPose();
        }
    }
    set skins(skins) {
        if (skins !== undefined) {
            this.changeSkins(skins);
        }
        this._skins = skins;
    }
    get skins() {
        return this._skins;
    }
}
exports.default = SpineNode;
//# sourceMappingURL=SpineNode.js.map