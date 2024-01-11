import { ChangeEvent, FormEvent, KeyboardEvent, useEffect, useState } from 'react';

import { useActions, useAppDispatch, useAppSelector } from '../store';
import { smsCountRemainRequest, sendMessageThunk, sendLogData } from '../store/slices/chat-slice';
import { useElementHeight } from '../hooks/useElementHeight';
import { SendIcon } from './icons';

const ChatFooter = () => {
	const dispatch = useAppDispatch();
	const [ prompt, setPrompt ] = useState<string>('');
	const { elementRef, elementStyle } = useElementHeight('footer');
	const { canSendMessage, userDialogData } = useAppSelector((state) => state.chat);
	const { addMessage } = useActions();

	const handleKeyup = (input: HTMLTextAreaElement): void => {
		input.style.height = '64px';
		input.style.height = `${input.scrollHeight}px`;
	}

	const messageOnChange = ({ target }: ChangeEvent<HTMLTextAreaElement>): void => {
		setPrompt(target.value);
		handleKeyup(target);
	};

	const sendMessage = async (): Promise<void> => {
		if (!prompt.trim()) return;

		try {
			const res = dispatch(smsCountRemainRequest());
			const smsLeftCount = await res.unwrap();

			if (smsLeftCount) {
				dispatch(sendMessageThunk(prompt));
			}
		} catch (err) {
			console.warn(err);
			addMessage({
				id: crypto.randomUUID(),
				message: 'Произошла ошибка, попробуйте позже',
				sender: 'bot',
				type_message: 'system'
			});
		} finally {
			setPrompt('');
		}
	};

	const formOnSubmit = (event: FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		sendMessage();
	};

	const handleTextareaKeyup = (event: KeyboardEvent<HTMLTextAreaElement>): void => {
		// Проверяем, была ли нажата клавиша Enter (код клавиши 13)
		if (event.key === 'Enter') {
			// Предотвращаем перенос строки в текстовом поле
			event.preventDefault();
			sendMessage();
		}
	};

	useEffect(() => {
		dispatch(sendLogData(userDialogData));
	}, [userDialogData]);

	return (
		<div className="m-chat-footer" ref={elementRef} style={elementStyle}>
			<form className="m-chat-footer__form" onSubmit={formOnSubmit}>
				<textarea
					className="m-chat-footer__control"
					placeholder="Введите сообщение.."
					value={prompt}
					onChange={messageOnChange}
					onKeyDown={handleTextareaKeyup}
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