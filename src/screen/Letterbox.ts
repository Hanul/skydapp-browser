import DomNode from "../dom/DomNode";

export default class Letterbox extends DomNode<HTMLDivElement> {

    constructor() {
        super(document.createElement("div"));
        this.style({
            position: "absolute",
            zIndex: 9999998,
            backgroundColor: "#000000",
        });
    }
}
