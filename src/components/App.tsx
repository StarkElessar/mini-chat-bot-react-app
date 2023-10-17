import { FC, useEffect, useRef, useState } from 'react';

import ChatHeader from './ChatHeader';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import { IDataResponse, IMessage } from '../types';

const closeSocketHandler = (data: CloseEvent) => {
	console.log('WebSocket is close', data);
};

const App: FC = () => {
	const [ allMessages, setAllMessages ] = useState<IMessage[]>([]);
	const ws = useRef<WebSocket | null>(null);

	useEffect(() => {
		ws.current = new WebSocket('ws://localhost:9000/chat');

		ws.current.addEventListener('open', (data) => {
			console.log('WebSocket is open', data);
		});

		ws.current.addEventListener('message', (event) => {
			const { id, type, message, sender }: IDataResponse = JSON.parse(event.data);
			console.log(event.data);

			if (type === 'stream') {
				setAllMessages((prevState) => {
					const existingMessageIndex = prevState.findIndex((message) => message.id === id);

					if (existingMessageIndex !== -1) {
						const updatedMessages = [...prevState];
						updatedMessages[existingMessageIndex].message += message;

						return updatedMessages;
					}

					return [
						...prevState,
						{ sender, message, id, },
					]
				});
			}
		});

		ws.current.addEventListener('close', closeSocketHandler);

		return () => {
			ws.current?.removeEventListener('close', closeSocketHandler);
			ws.current?.close();
		};
	}, []);

	return (
		<div className="m-chat">
			<ChatHeader/>
			<ChatBody allMessages={allMessages}/>
			<ChatFooter webSocket={ws.current}/>
		</div>
	);
};

export default App;
