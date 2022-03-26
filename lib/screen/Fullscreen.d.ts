import Screen from "./Screen";
export default class Fullscreen extends Screen {
    private options?;
    ratio: number;
    private letterboxes;
    constructor(options?: {
        width?: number | undefined;
        height?: number | undefined;
        minWidth?: number | undefined;
        minHeight?: number | undefined;
        maxWidth?: number | undefined;
        maxHeight?: number | undefined;
        antialias?: boolean | undefined;
        fps?: number | undefined;
    } | undefined);
    private windowResizeHandler;
    delete(): void;
}
//# sourceMappingURL=Fullscreen.d.ts.map