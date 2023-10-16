import React, { FC } from 'react';
import Message from './Message';

interface IMessage {
	sender: 'bot' | 'you',
	message: string;
}

interface IProps {
	allMessages: IMessage[] | null;
	result: string;
}

const ChatBody: FC<IProps> = ({ allMessages, result }) => {
	return (
		<div className="m-chat-body">
			<Message isMe={false} message={result}/>
		</div>
	);
};

export default ChatBody;