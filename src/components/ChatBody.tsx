import React, { FC, memo, useEffect, useRef } from 'react';
import Message from './Message';
import { IMessage } from '../types';

interface IProps {
	allMessages: IMessage[];
}

const ChatBody: FC<IProps> = memo(({ allMessages = [] }) => {
	const messagesEnd = useRef<HTMLDivElement>(null);

	useEffect(() => {
		messagesEnd.current?.scrollIntoView();
	}, [allMessages]);

	return (
		<div className="m-chat-body">
			{
				allMessages.map(({sender, message, id}) => {
					return <Message isMe={sender === 'you'} message={message} key={id}/>
				})
			}
			<div ref={messagesEnd}/>
		</div>
	);
});

export default ChatBody;