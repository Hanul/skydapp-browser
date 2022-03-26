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
Object.defineProperty(exports, "__esModule", { value: true });
const PIXI = __importStar(require("pixi.js"));
class TextureLoader {
    async load(src) {
        let texture = PIXI.utils.TextureCache[src];
        if (texture === undefined) {
            return new Promise((resolve) => {
                const img = new Image();
                img.crossOrigin = "anonymous";
                img.onload = () => {
                    img.onload = null;
                    if (PIXI.utils.TextureCache[src] !== undefined) {
                        texture = PIXI.utils.TextureCache[src];
                    }
                    else {
                        texture = PIXI.Texture.from(img);
                        PIXI.Texture.addToCache(texture, src);
                    }
                    resolve(texture);
                };
                img.src = src;
            });
        }
        else {
            return texture;
        }
    }
}
exports.default = new TextureLoader();
//# sourceMappingURL=TextureLoader.js.map