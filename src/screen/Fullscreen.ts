import BodyNode from "../dom/BodyNode";
import Letterbox from "./Letterbox";
import Screen from "./Screen";

export default class Fullscreen extends Screen {

    public ratio = 1;

    private letterboxes = {
        top: new Letterbox(), bottom: new Letterbox(),
        left: new Letterbox(), right: new Letterbox(),
    };

    constructor(private options?: {
        width?: number, height?: number,
        minWidth?: number, minHeight?: number,
        maxWidth?: number, maxHeight?: number,
        antialias?: boolean,
        fps?: number,
    }) {
        super(
            options?.width === undefined ? 0 : options.width,
            options?.height === undefined ? 0 : options.height,
            options?.antialias === true,
            options?.fps,
        );

        this.style({ position: "fixed", left: 0, top: 0, width: "100%", height: "100%" });
        this.canvas.style({ position: "fixed", zIndex: -1 });

        this.append(...Object.values(this.letterboxes));

        this.letterboxes.top.style({ left: 0, top: 0, width: "100%" });
        this.letterboxes.bottom.style({ left: 0, bottom: 0, width: "100%" });
        this.letterboxes.left.style({ left: 0, top: 0, height: "100%" });
        this.letterboxes.right.style({ right: 0, top: 0, height: "100%" });

        window.addEventListener("resize", this.windowResizeHandler);
        this.windowResizeHandler();

        BodyNode.append(this);
    }

    private windowResizeHandler = () => {

        const winWidth = document.documentElement.clientWidth;
        const winHeight = window.innerHeight;

        let isToFixWidth = false;
        let isToFixHeight = false;

        if (this.options?.width === undefined) {
            this.width = winWidth;
            isToFixWidth = true;
        }

        if (this.options?.height === undefined) {
            this.height = winHeight;
            isToFixHeight = true;
        }

        let widthRatio = winWidth / this.width;
        let heightRatio = winHeight / this.height;

        if (widthRatio < heightRatio) { this.ratio = widthRatio; }
        else { this.ratio = heightRatio; }

        if (this.options?.minWidth !== undefined && this.width / this.ratio < this.options.minWidth) {
            this.width = this.options.minWidth;
            isToFixWidth = false;
        }

        if (this.options?.minHeight !== undefined && this.height / this.ratio < this.options.minHeight) {
            this.height = this.options.minHeight;
            isToFixHeight = false;
        }

        widthRatio = winWidth / this.width;
        heightRatio = winHeight / this.height;

        if (widthRatio < heightRatio) { this.ratio = widthRatio; }
        else { this.ratio = heightRatio; }

        if (isToFixWidth === true) { this.width /= this.ratio; }
        if (isToFixHeight === true) { this.height /= this.ratio; }

        if (this.options?.maxWidth !== undefined && this.width > this.options.maxWidth) {
            this.width = this.options.maxWidth;
        }

        if (this.options?.maxHeight !== undefined && this.height > this.options.maxHeight) {
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

    public delete(): void {
        window.removeEventListener("resize", this.windowResizeHandler);
        super.delete();
    }
}
