import { useState, ChangeEvent, FormEvent, KeyboardEvent, FC, ReactElement } from 'react';
import { SendIcon } from './icons';
import { useElementHeight } from '../hooks/useElementHeight';

interface IProps {
	webSocket: WebSocket | null;
	prompt: string;
	setPrompt: (value: string) => void;
}

const ChatFooter: FC<IProps> = ({ webSocket, prompt, setPrompt }): ReactElement => {
	const { elementRef, elementStyle } = useElementHeight('footer');

	const handleKeyup = (input: HTMLTextAreaElement): void => {
		input.style.height = '64px';
		input.style.height = `${input.scrollHeight}px`;
	}

	const messageOnChange = ({ target }: ChangeEvent<HTMLTextAreaElement>): void => {
		setPrompt(target.value);
		handleKeyup(target);
	};

	const sendMessage = (): void => {
		console.log({ prompt });

		webSocket?.send(prompt);
		setPrompt('');
	};

	const formOnSubmit = (event: FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		sendMessage();
	};

	const handleTextareaKeyup = (event: KeyboardEvent<HTMLTextAreaElement>): void => {
		// Проверяем, была ли нажата клавиша Enter (код клавиши 13)
		if (!event.shiftKey && event.code === 'Enter') {
			event.preventDefault(); // Предотвращаем перенос строки в текстовом поле
			sendMessage();
		}
	};

	return (
		<div className="m-chat-footer" ref={elementRef} style={elementStyle}>
			<form className="m-chat-footer__form" onSubmit={formOnSubmit}>
				<textarea
					className="m-chat-footer__control"
					placeholder="Отправить сообщение.."
					value={prompt}
					onChange={messageOnChange}
					onKeyDown={handleTextareaKeyup}
				></textarea>

				<button
					className="m-chat-footer__btn"
					type="submit"
					title="Отправить сообщение"
					disabled={!prompt}
				>
					<SendIcon/>
				</button>
			</form>
		</div>
	);
};

export default ChatFooter;