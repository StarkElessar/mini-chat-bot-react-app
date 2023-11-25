import { FC, memo, useEffect, useRef } from 'react';

import Message from './Message';
import { useAppSelector } from '../store';

const ChatBody: FC = memo(() => {
	const messagesEnd = useRef<HTMLDivElement>(null);
	const messages = useAppSelector((state) => state.chat.messages);

	useEffect(() => {
		messagesEnd.current?.scrollIntoView();
	}, [messages]);

	return (
		<div className="m-chat-body">
			{
				messages.map(({sender, message, id}) => {
					return <Message isMe={sender === 'you'} message={message} key={id}/>
				})
			}
			<div ref={messagesEnd}/>
		</div>
	);
});

export default ChatBody;