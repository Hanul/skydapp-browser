import { EventContainer } from "skydapp-common";

export default class WebSocketClient extends EventContainer {

    private webSocket!: WebSocket;
    private sendKey: number = 0;

    constructor(private url: string) {
        super();
        this.reconnect();
    }

    public reconnect() {
        this.webSocket = new WebSocket(this.url);
        this.webSocket.onopen = () => this.fireEvent("connect");
        this.webSocket.onmessage = (e) => {
            const data = JSON.parse(e.data);
            this.fireEvent(data.method, ...data.params);
        };
        this.webSocket.onclose = () => this.fireEvent("disconnect");
    }

    public async send(method: string, ...params: any[]): Promise<any> {
        this.webSocket.send(JSON.stringify({ method, params, __send_key: this.sendKey }));
        const callbackName = `__callback_${this.sendKey}`;
        const errorkName = `__error_${this.sendKey}`;
        this.sendKey += 1;
        return new Promise((resolve, reject) => {
            this.on(callbackName, resolve);
            this.on(errorkName, reject);
        });
    }
}
