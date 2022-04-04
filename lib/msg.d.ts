declare type Messages = {
    [language: string]: string;
};
declare const msg: {
    (keyOrMessages: string | Messages): string;
    language: string;
    parseCSV(content: string): void;
    getMessages(key: string): Messages;
    getLangMessages(keyOrMessages: string | Messages): {
        [x: string]: string;
    };
};
export default msg;
//# sourceMappingURL=msg.d.ts.map