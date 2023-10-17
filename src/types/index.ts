export interface IMessage {
	sender: 'bot' | 'you',
	message: string;
	id: string;
}

export interface IDataResponse extends IMessage {
	type: 'start' | 'stream' | 'end';
}