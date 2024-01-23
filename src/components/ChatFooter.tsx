import { ChangeEvent, FC, FormEvent, KeyboardEvent, RefObject, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { ChatWebSocketAPI } from '../api/chat-websocket-api';
import { useElementHeight } from '../hooks/element-height';
import { SendIcon } from './icons';

interface IProps {
	textControlRef: RefObject<HTMLTextAreaElement>;
}

const ChatFooter: FC<IProps> = ({ textControlRef }) => {
	const dispatch = useAppDispatch();
	const [ prompt, setPrompt ] = useState<string>('');
	const { elementRef, elementStyle } = useElementHeight('footer');
	const { canSendMessage } = useAppSelector((state) => state.chat);

	const handleKeyup = (input: HTMLTextAreaElement): void => {
		input.style.height = '64px';
		input.style.height = `${input.scrollHeight}px`;
	}

	const messageOnChange = ({ target }: ChangeEvent<HTMLTextAreaElement>): void => {
		setPrompt(target.value);
		handleKeyup(target);
	};

	const sendMessage = () => {
		if (!prompt.trim()) return;

		const messageData = { message: prompt };

		dispatch(ChatWebSocketAPI.sendMessage(messageData));
		setPrompt('');
	};

	const formOnSubmit = (event: FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		sendMessage();
	};

	const handleTextareaKeyup = (event: KeyboardEvent<HTMLTextAreaElement>): void => {
		const { shiftKey, key } = event;
		// Проверяем, была ли нажата клавиша Enter (код клавиши 13)
		if (!shiftKey && key === 'Enter') {
			// Предотвращаем перенос строки в текстовом поле
			event.preventDefault();
			sendMessage();
		}
	};

	return (
		<div className="m-chat-footer" ref={elementRef} style={elementStyle}>
			<form className="m-chat-footer__form" onSubmit={formOnSubmit}>
				<textarea
					className="m-chat-footer__control"
					placeholder="Введите сообщение.."
					value={prompt}
					onChange={messageOnChange}
					onKeyDown={handleTextareaKeyup}
					ref={textControlRef}
				></textarea>

				<button
					className="m-chat-footer__btn"
					type="submit"
					title="Отправить сообщение"
					disabled={!prompt || !canSendMessage}
				>
					<SendIcon/>
				</button>
			</form>
		</div>
	);
};

export default ChatFooter;