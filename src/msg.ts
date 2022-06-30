import * as Papaparse from "papaparse";
import BrowserInfo from "./BrowserInfo";

type Messages = { [language: string]: string };

const data: { [key: string]: Messages } = {};

const msg = (keyOrMessages: string | Messages) => {

    const messages: Messages = typeof keyOrMessages === "string" ? data[keyOrMessages] : keyOrMessages;
    if (messages === undefined) {
        console.error(`${keyOrMessages} not exists.`);
    } else {

        let str = messages[BrowserInfo.language];
        if (str === undefined) {

            let language: string = "";
            let locale: string = "";

            if (BrowserInfo.language.length === 2) {
                language = BrowserInfo.language.toLowerCase();
            } else {
                language = BrowserInfo.language.substring(0, 2).toLowerCase();
                locale = BrowserInfo.language.substring(3).toLowerCase();
            }

            str = messages[language];
            if (typeof str === "object") {
                if (str[locale] !== undefined) {
                    str = str[locale];
                } else {
                    // if not found, return the first string
                    str = str[Object.keys(str)[0]];
                }
            }
        }

        if (str === undefined) {
            // if there is english string, return the english string, if not, return the first string
            if (messages.en !== undefined) {
                str = messages.en;
            } else {
                str = messages[Object.keys(messages)[0]];
            }
        }

        if (str !== undefined && typeof str === "object") {
            // if not found, return the first string
            str = str[Object.keys(str)[0]];
        }

        return str === undefined ? "" : str;
    }

    return "";
};

msg.parseCSV = (content: string) => {

    let languages: string[] = [];

    for (const [index, texts] of Papaparse.parse<string[]>(content).data.entries()) {

        // first line is languages.
        if (index === 0) {
            languages = texts;
        } else {

            const key = texts[0];
            const messages: Messages = {};

            for (const [textIndex, text] of texts.entries()) {
                if (textIndex > 0 && text !== "") {
                    messages[languages[textIndex]] = text.replace(/\\n/g, "\n");
                }
            }
            data[key] = messages;
        }
    }
};

msg.getMessages = (key: string) => {
    return data[key];
};

msg.getLangMessages = (keyOrMessages: string | Messages) => {

    let language: string = "";
    let locale: string = "";

    if (BrowserInfo.language.length === 2) {
        language = BrowserInfo.language.toLowerCase();
    } else {
        language = BrowserInfo.language.substring(0, 2).toLowerCase();
        locale = BrowserInfo.language.substring(3).toLowerCase();
    }

    const messages = typeof keyOrMessages === "string" ? data[keyOrMessages] : keyOrMessages;
    if (messages === undefined) {
        console.error(`${keyOrMessages} not exists.`);
    } else {

        let str = messages[BrowserInfo.language];
        if (str === undefined) {

            str = messages[language];
            if (str !== undefined) {
                if (typeof str === "object") {
                    if (str[locale] !== undefined) {
                        str = str[locale];
                    } else {
                        // if not found, return the first string
                        str = str[Object.keys(str)[0]];
                    }
                }
            }
        }

        if (str === undefined) {
            // if there is english string, return the english string, if not, return the first string
            if (messages.en !== undefined) {
                str = messages.en;
            } else {
                str = messages[Object.keys(messages)[0]];
            }
        }

        if (str !== undefined && typeof str === "object") {
            // if not found, return the first string
            str = str[Object.keys(str)[0]];
        }

        return {
            [language]: str === undefined ? "" : str,
        };
    }

    return {
        [language]: "",
    };
}

export default msg;
