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
const Papaparse = __importStar(require("papaparse"));
const data = {};
const msg = (keyOrMessages) => {
    const messages = typeof keyOrMessages === "string" ? data[keyOrMessages] : keyOrMessages;
    if (messages === undefined) {
        console.error(`${keyOrMessages} not exists.`);
    }
    else {
        let str = messages[msg.language];
        if (str === undefined) {
            let language = "";
            let locale = "";
            if (msg.language.length === 2) {
                language = msg.language.toLowerCase();
            }
            else {
                language = msg.language.substring(0, 2).toLowerCase();
                locale = msg.language.substring(3).toLowerCase();
            }
            str = messages[language];
            if (typeof str === "object") {
                if (str[locale] !== undefined) {
                    str = str[locale];
                }
                else {
                    str = str[Object.keys(str)[0]];
                }
            }
        }
        if (str === undefined) {
            if (messages.en !== undefined) {
                str = messages.en;
            }
            else {
                str = messages[Object.keys(messages)[0]];
            }
        }
        if (str !== undefined && typeof str === "object") {
            str = str[Object.keys(str)[0]];
        }
        return str === undefined ? "" : str;
    }
    return "";
};
msg.language = "en";
msg.parseCSV = (content) => {
    let languages = [];
    for (const [index, texts] of Papaparse.parse(content).data.entries()) {
        if (index === 0) {
            languages = texts;
        }
        else {
            const key = texts[0];
            const messages = {};
            for (const [textIndex, text] of texts.entries()) {
                if (textIndex > 0 && text !== "") {
                    messages[languages[textIndex]] = text.replace(/\\n/g, "\n");
                }
            }
            data[key] = messages;
        }
    }
};
msg.getMessages = (key) => {
    return data[key];
};
msg.getLangMessages = (keyOrMessages) => {
    let language = "";
    let locale = "";
    if (msg.language.length === 2) {
        language = msg.language.toLowerCase();
    }
    else {
        language = msg.language.substring(0, 2).toLowerCase();
        locale = msg.language.substring(3).toLowerCase();
    }
    const messages = typeof keyOrMessages === "string" ? data[keyOrMessages] : keyOrMessages;
    if (messages === undefined) {
        console.error(`${keyOrMessages} not exists.`);
    }
    else {
        let str = messages[msg.language];
        if (str === undefined) {
            str = messages[language];
            if (str !== undefined) {
                if (typeof str === "object") {
                    if (str[locale] !== undefined) {
                        str = str[locale];
                    }
                    else {
                        str = str[Object.keys(str)[0]];
                    }
                }
            }
        }
        if (str === undefined) {
            if (messages.en !== undefined) {
                str = messages.en;
            }
            else {
                str = messages[Object.keys(messages)[0]];
            }
        }
        if (str !== undefined && typeof str === "object") {
            str = str[Object.keys(str)[0]];
        }
        return {
            [language]: str === undefined ? "" : str,
        };
    }
    return {
        [language]: "",
    };
};
exports.default = msg;
//# sourceMappingURL=msg.js.map