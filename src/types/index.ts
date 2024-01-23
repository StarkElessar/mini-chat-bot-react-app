export interface IMessage {
	sender: 'bot' | 'you',
	message: string;
	id: string;
	type_message: 'message' | 'file' | 'system' | 'image-link';
	link?: string;
	photo_link?: string;
	has_link?: boolean;
	has_feedback?: boolean;
}

export interface IDataResponse extends IMessage {
	type: 'start' | 'stream' | 'end';
}

export interface ISendFeedbackDto {
	id: string;
	text_response: string;
	rating: number;
}

export interface ISendMessageDto {
	message: string;
}