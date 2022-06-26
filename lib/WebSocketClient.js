"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skydapp_common_1 = require("skydapp-common");
class WebSocketClient extends skydapp_common_1.EventContainer {
    constructor(url) {
        super();
        this.url = url;
        this.sendKey = 0;
        this.reconnect();
    }
    reconnect() {
        this.webSocket = new WebSocket(this.url);
        this.webSocket.onopen = () => this.fireEvent("connect");
        this.webSocket.onmessage = (e) => {
            const data = JSON.parse(e.data);
            this.fireEvent(data.method, ...data.params);
        };
        this.webSocket.onclose = () => this.fireEvent("disconnect");
    }
    async send(method, ...params) {
        this.webSocket.send(JSON.stringify({ method, params, __send_key: this.sendKey }));
        const callbackName = `__callback_${this.sendKey}`;
        this.sendKey += 1;
        return new Promise((resolve) => this.on(callbackName, resolve));
    }
}
exports.default = WebSocketClient;
//# sourceMappingURL=WebSocketClient.js.map