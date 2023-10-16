import { FC, useEffect, useRef, useState } from 'react';

import ChatHeader from './ChatHeader';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import { log } from 'util';

interface IMessage {
	sender: 'bot' | 'you',
	message: string;
}

const App: FC = () => {
	const [ prompt, setPrompt ] = useState<string>('');
	const [ allMessages, setAllMessages ] = useState<IMessage[] | null>(null);
	const [ result, setResult ] = useState<string>('');
	const messageRef = useRef<string>('');
	const ws = useRef<WebSocket | null>(null);

	useEffect(() => {
		ws.current = new WebSocket('ws://localhost:9000/chat');

		ws.current.addEventListener('open', (data) => {
			console.log('WebSocket is open', data);
		});

		ws.current.addEventListener('message', (event) => {
			const data = JSON.parse(event.data);

			messageRef.current += data.message;
			setResult(messageRef.current);

			console.log(data);
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
			<ChatBody allMessages={allMessages} result={result}/>
			<ChatFooter webSocket={ws.current} prompt={prompt} setPrompt={setPrompt}/>
		</div>
	);
};

export default App;
