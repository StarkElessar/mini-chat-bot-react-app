export interface IMessage {
	sender: 'bot' | 'you',
	message: string;
	id: string;
	type_message: 'message' | 'file';
}

export interface IDataResponse extends IMessage {
	type: 'start' | 'stream' | 'end';
}