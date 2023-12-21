import { memo, useEffect, useRef } from 'react';

import Message from './Message';
import { useAppSelector } from '../store';

const ChatBody = memo(() => {
	const messagesEnd = useRef<HTMLDivElement>(null);
	const messages = useAppSelector((state) => state.chat.messages);

	useEffect(() => {
		messagesEnd.current?.scrollIntoView();
	}, [messages]);

	return (
		<div className="m-chat-body">
			{
				messages.map((message) => (
					<Message isMe={message.sender === 'you'} message={message}/>
				))
			}
			<div ref={messagesEnd}/>
		</div>
	);
});

export default ChatBody;