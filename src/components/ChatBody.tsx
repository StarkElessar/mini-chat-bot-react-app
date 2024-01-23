import { memo, useEffect, useRef } from 'react';

import { useAppSelector } from '../hooks/redux-hooks';
import Message from './Message';
import SystemMessage from './SystemMessage';
import ImageLinkMessage from './ImageLinkMessage';

const ChatBody = memo(() => {
	const messagesEnd = useRef<HTMLDivElement>(null);
	const { messages, isTypingBot } = useAppSelector(({ chat }) => chat);

	useEffect(() => {
		messagesEnd.current?.scrollIntoView();
	}, [messages, isTypingBot]);

	return (
		<div className="m-chat-body">
			{
				messages.map((message) => {
					switch (message.type_message) {
						case 'message': {
							return <Message isMe={message.sender === 'you'} message={message} key={message.id}/>
						}
						case 'system': {
							return <SystemMessage key={message.id} message={message.message}/>
						}
						case 'image-link': {
							return (
								<ImageLinkMessage
									key={message.id}
									isMe={message.sender === 'you'}
									message={message.message}
									link={message.link}
									photo={message.photo_link}
								/>
							)
						}
					}
				})
			}

			{
				isTypingBot && (
					<div className="m-chat-message-typing">
						<span className="m-chat-message-typing__loader-bar"></span>
						<span className="m-chat-message-typing__loader-bar"></span>
						<span className="m-chat-message-typing__loader-bar"></span>
					</div>
				)
			}
			<div ref={ messagesEnd }/>
		</div>
	);
});

export default ChatBody;