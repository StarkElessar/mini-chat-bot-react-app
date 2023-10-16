import { FC, RefObject, useEffect, useRef, useState } from 'react';

import ChatHeader from './ChatHeader';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import { log } from 'util';
import message from './Message';

interface IMessage {
	sender: 'bot' | 'you',
	message: string;
	id: string;
}

interface IDataMessage {
	message: string;
	sender: 'bot' | 'you';
	type: 'start' | 'stream' | 'end'
}

const App: FC = () => {
	const [ prompt, setPrompt ] = useState<string>('');
	const [ allMessages, setAllMessages ] = useState<IMessage[]>([]);
	const [ result, setResult ] = useState<string>('');
	const [ isTyping, setIsTyping ] = useState<boolean>(false);
	const messagesContainerRef = useRef<HTMLDivElement | null>(null);
	const messageRef = useRef<string>('');
	const ws = useRef<WebSocket | null>(null);

	useEffect(() => {
		ws.current = new WebSocket('ws://localhost:9000/chat');

		ws.current.addEventListener('open', (data) => {
			console.log('WebSocket is open', data);
		});

		ws.current.addEventListener('message', (event) => {
			const data: IDataMessage = JSON.parse(event.data);
			messageRef.current += data.message;
			setResult(messageRef.current);

			console.log(data)

			switch (data.type) {
				case 'stream':
					setIsTyping(true);
					break;
				case 'end':
					console.log('Стрим закончился, вот полное смс: ', messageRef.current);
					console.log('А это дата: ', data);
					const newMsg = {
						sender: data.sender,
						message: messageRef.current,
						id: crypto.randomUUID()
					};

					setAllMessages((prevState) => {
						return [
							...prevState,
							newMsg
						]
					});
					messageRef.current = '';
					setIsTyping(false);

					console.log(messagesContainerRef);
					break;
				default:
					break;
			}
		});

		ws.current.addEventListener('close', (data) => {
			console.log('WebSocket is close', data);
		});

		return () => {
			ws.current?.close();
		};
	}, []);

	return (
		<div className="m-chat">
			<ChatHeader/>
			<ChatBody allMessages={allMessages} result={result} isTyping={isTyping}/>
			<ChatFooter webSocket={ws.current} prompt={prompt} setPrompt={setPrompt}/>
		</div>
	);
};

export default App;
