import './../assets/styles/chat.scss';

import { useEffect, useRef, MouseEvent } from 'react';
import { useResizable } from 'react-resizable-layout';

import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { ChatWebSocketAPI } from '../api/chat-websocket-api';
import ChatHeader from './ChatHeader';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import ChatPopups from './ChatPopups';

const INITIAL_WIDTH = 340;

const ChatBot = () => {
	const container = useRef<HTMLTextAreaElement>(null);
	const dispatch = useAppDispatch();
	const isOpen = useAppSelector((state) => state.chat.isOpen);

	const {
		position: width,
		separatorProps: separatorPropsLeft,
		isDragging: isDraggingX
	} = useResizable({
		axis: 'x',
		min: 300,
		initial: INITIAL_WIDTH,
		reverse: true,
		shiftStep: 30
	});

	const {
		position: height,
		separatorProps: separatorPropsTop,
		isDragging: isDraggingY
	} = useResizable({
		axis: 'y',
		min: 300,
		initial: 500,
		reverse: true
	})

	const wrapperStyles = {
		width: isOpen ? width : INITIAL_WIDTH,
		height: isOpen ? height : 'var(--m-chat-header-height)'
	};

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
			className={ `m-chat ${isOpen ? 'is-open' : ''} ${isDraggingX || isDraggingY ? 'dragging' : ''}` }
			onClick={onFocusElement}
			style={wrapperStyles}
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
				{...separatorPropsLeft}
			/>
		</div>
	);
};

export default ChatBot;