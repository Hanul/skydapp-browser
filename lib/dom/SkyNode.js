"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skydapp_common_1 = require("skydapp-common");
class SkyNode extends skydapp_common_1.EventContainer {
    constructor() {
        super(...arguments);
        this.children = [];
    }
    append(...nodes) {
        for (const node of nodes) {
            if (node !== undefined) {
                node.appendTo(this);
            }
        }
    }
    appendTo(node, index) {
        if (this.parent === node && index !== undefined && this.parent.children.indexOf(this) < index) {
            index -= 1;
        }
        this.exceptFromParent();
        if (index !== undefined && index < node.children.length) {
            node.children.splice(index, 0, this);
        }
        else {
            node.children.push(this);
        }
        this.parent = node;
        return this;
    }
    exceptFromParent() {
        if (this.parent !== undefined) {
            skydapp_common_1.SkyUtil.pull(this.parent.children, this);
            this.parent = undefined;
        }
    }
    empty() {
        const copy = [];
        for (const child of this.children) {
            copy.push(child);
        }
        for (const child of copy) {
            child.delete();
        }
        return this;
    }
    checkChild(target) {
        for (const child of this.children) {
            if (child === target || child.checkChild(target) === true) {
                return true;
            }
        }
        return false;
    }
    delete() {
        super.delete();
        this.exceptFromParent();
        this.empty();
        this.children = undefined;
    }
}
exports.default = SkyNode;
//# sourceMappingURL=SkyNode.js.map