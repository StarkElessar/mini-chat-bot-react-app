import { IDataResponse } from '../types';

type SubscriberType = (data: IDataResponse) => void;

export class WebSocketManager {
	private _ws: WebSocket | null = null;
	private _subscribers: SubscriberType[] = [];
	private readonly _url: string = '';

	constructor(url: string) {
		this._url = url;
	}

	public subscribe(callback: SubscriberType): void {
		this._subscribers.push(callback);
	}

	public unsubscribe(callback: SubscriberType): void {
		this._subscribers = this._subscribers.filter((subscriber) => subscriber !== callback);
	}

	public createWSChannel(): void {
		this._ws = new WebSocket(this._url);
		this._ws?.addEventListener('open', this.onOpenSocketHandler.bind(this));
		this._ws?.addEventListener('message', this.onMessageHandler.bind(this));
		this._ws?.addEventListener('error', this.onErrorHandler.bind(this));
		this._ws?.addEventListener('close', this.onCloseSocketHandler.bind(this));
	}

	public closeWSChanel(): void {
		this._ws?.removeEventListener('open', this.onOpenSocketHandler.bind(this));
		this._ws?.removeEventListener("close", this.onCloseSocketHandler.bind(this));
		this._ws?.removeEventListener("message", this.onMessageHandler.bind(this));
		this._ws?.removeEventListener('error', this.onErrorHandler.bind(this));
		this._ws?.close();
	}


	public sendMessage(message: string | Blob): void {
		this._ws?.send(message);
	}

	private onOpenSocketHandler(event: Event): void {
		this._subscribers.forEach((subscriber) => subscriber({
			id: crypto.randomUUID(),
			message: this._ws?.readyState === 1 ? 'Успешное подключение к чату' : 'Не удалось подключиться',
			sender: 'bot',
			type: 'end',
			type_message: 'system'
		}))
	}

	private onMessageHandler({ data }: MessageEvent): void {
		const resData = <IDataResponse>JSON.parse(data);
		this._subscribers.forEach((subscriber) => subscriber(resData));
	}

	private onErrorHandler(event: any): void {
		console.error('WebSocket error.', event);
	}

	private onCloseSocketHandler(event: CloseEvent): void {
		this._subscribers.forEach((subscriber) => subscriber({
			id: crypto.randomUUID(),
			message: 'Соединение разорвано',
			type_message: 'system',
			type: 'end',
			sender: 'bot'
		}));
		setTimeout(this.createWSChannel.bind(this), 3000);
	}
}