export interface IMessage {
	sender: 'bot' | 'you',
	message: string;
	id: string;
	type_message: 'message' | 'file' | 'system' | 'image-link';
	link?: string;
	photo_link?: string;
	hasLink?: boolean;
}

export interface IDataResponse extends IMessage {
	type: 'start' | 'stream' | 'end';
}