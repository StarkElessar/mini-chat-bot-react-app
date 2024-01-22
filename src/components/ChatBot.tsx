import './../assets/styles/chat.scss';

import { useEffect, useRef, MouseEvent } from 'react';
import { useResizable } from 'react-resizable-layout';

import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { ChatWebSocketAPI } from '../api/chat-websocket-api';
import ChatHeader from './ChatHeader';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import ChatPopups from './ChatPopups';

const ChatBot = () => {
	const container = useRef<HTMLTextAreaElement>(null);
	const dispatch = useAppDispatch();
	const isOpen = useAppSelector((state) => state.chat.isOpen);
	const { position, separatorProps } = useResizable({
		axis: 'x',
		min: 300,
		initial: 340,
		reverse: true,
	});

	const { position: posTop, separatorProps: separatorPropsTop } = useResizable({
		axis: 'y',
		min: 300,
		initial: 500,
		reverse: true,
	})

	const onFocusElement = (event: MouseEvent<HTMLDivElement>) => {
		const target = event.target as HTMLElement;

		if (target.closest('.m-chat-message') || target.closest('.m-chat-popup')) {
			return;
		}

		container.current?.focus();
	};

	useEffect(() => {
		dispatch(ChatWebSocketAPI.openWSChanel());

		return () => {
			dispatch(ChatWebSocketAPI.closeWSChanel());
		};
	}, [dispatch]);

	return (
		<div
			className={ `m-chat ${isOpen ? 'is-open' : ''}` }
			onClick={onFocusElement}
			style={{
				width: isOpen ? position : 340,
				height: isOpen ? posTop : 'var(--m-chat-header-height)'
			}}
		>
			<ChatHeader/>
			<ChatBody/>
			<ChatFooter textControlRef={container}/>
			<ChatPopups/>
			<div
				className="m-chat-separator-top"
				tabIndex={0}
				{...separatorPropsTop}
			/>
			<div
				className="m-chat-separator-left"
				tabIndex={0}
				{...separatorProps}
			/>
		</div>
	);
};

export default ChatBot;