import { FC, MouseEvent, ReactElement } from 'react';

import { useElementHeight } from '../hooks/element-height';
import { useActions, useAppSelector } from '../hooks/redux-hooks';

const ChatHeader: FC = (): ReactElement => {
	const { elementRef, elementStyle } = useElementHeight('header');
	const { openChat, closeChat} = useActions();
	const isOpen = useAppSelector(({ chat }) => chat.isOpen);

	const onOpenChatHandler = (): void => {
		if (isOpen) return;
		openChat();
	};

	const onCloseChatHandler = (event: MouseEvent): void => {
		event.stopPropagation();
		closeChat();
	};

	return (
		<div className="m-chat-header" ref={elementRef} style={elementStyle} onClick={onOpenChatHandler}>
			<div className="m-chat-header__title">Чат Mr.Stark</div>

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