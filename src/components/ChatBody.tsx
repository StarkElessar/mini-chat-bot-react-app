import React, { FC } from 'react';
import Message from './Message';

interface IMessage {
	sender: 'bot' | 'you',
	message: string;
	id: string;
}

interface IProps {
	allMessages: IMessage[];
	result: string;
	isTyping: boolean;
}

const ChatBody: FC<IProps> = ({ allMessages = [], result, isTyping  }) => {
	return (
		<div className="m-chat-body">
			{
				allMessages.map(({ sender, message, id }) => {
					return <Message isMe={sender === 'you'} message={message} key={id}/>
				})
			}

			{
				isTyping && (
					<div className="loader">
						печатает.. &nbsp;
						<span></span>
						<span></span>
						<span></span>
					</div>
				)
			}
		</div>
	);
};

export default ChatBody;