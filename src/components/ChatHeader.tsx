import { FC, MouseEvent, ReactElement } from 'react';

import { useElementHeight } from '../hooks/useElementHeight';
import { useActions } from '../store';

const ChatHeader: FC = (): ReactElement => {
	const { elementRef, elementStyle } = useElementHeight('header');
	const { openChat, closeChat} = useActions();

	const onOpenChatHandler = (): void => {
		openChat();
	};

	const onCloseChatHandler = (event: MouseEvent): void => {
		event.stopPropagation();
		closeChat();
	};

	return (
		<div className="m-chat-header" ref={elementRef} style={elementStyle} onClick={onOpenChatHandler}>
			<div className="m-chat-header__title">Напишите нам, мы онлайн!</div>

			<button
				type="button"
				className="m-chat-header__btn"
				title="Свернуть чат"
				onClick={onCloseChatHandler}
			>
			</button>
		</div>
	);
};

export default ChatHeader;