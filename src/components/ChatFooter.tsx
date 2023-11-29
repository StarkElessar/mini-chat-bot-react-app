import { ChangeEvent, FormEvent, KeyboardEvent, FC, ReactElement, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../store';
import { sendMessageThunk } from '../store/slices/chat-slice';
import { useElementHeight } from '../hooks/useElementHeight';
import { MicrophoneIcon, PaperClipIcon, SendIcon } from './icons';
import { readFile } from '../utils/read-file';

const ChatFooter: FC = (): ReactElement => {
	const [ prompt, setPrompt ] = useState<string>('');
	const { elementRef, elementStyle } = useElementHeight('footer');
	const canSendMessage = useAppSelector((state) => state.chat.canSendMessage);
	const dispatch = useAppDispatch();

	const handleKeyup = (input: HTMLTextAreaElement): void => {
		input.style.height = '64px';
		input.style.height = `${input.scrollHeight}px`;
	}

	const messageOnChange = ({ target }: ChangeEvent<HTMLTextAreaElement>): void => {
		setPrompt(target.value);
		handleKeyup(target);
	};

	const sendMessage = (): void => {
		console.log(prompt);
		if (!prompt.trim()) return;

		dispatch(sendMessageThunk(prompt));
		setPrompt('');
	};

	const formOnSubmit = (event: FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		sendMessage();
	};

	const handleTextareaKeyup = (event: KeyboardEvent<HTMLTextAreaElement>): void => {
		// Проверяем, была ли нажата клавиша Enter (код клавиши 13)
		if (event.key === 'Enter' && event.ctrlKey) {
			event.preventDefault(); // Предотвращаем перенос строки в текстовом поле
			sendMessage();
		}
	};

	const handleFileInputChange = async ({ target: { files } }: ChangeEvent<HTMLInputElement>): Promise<void> => {
		if (files?.length) {
			try {
				// Чтение файла как ArrayBuffer
				const arrayBuffer = await readFile(files[0]);
				console.log(arrayBuffer);

				// Создание Blob из ArrayBuffer
				const blob = new Blob([arrayBuffer]);
				console.log(blob);

				dispatch(sendMessageThunk(blob));
				console.log('Файл отправлен');
			} catch (error) {
				console.error('Ошибка при чтении файла', error);
			}
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
			<div className="m-chat-footer__actions">
				<label className="m-chat-footer__action-btn">
					<PaperClipIcon/>
					<input type="file" onChange={handleFileInputChange}/>
				</label>

				<button
					type="button"
					className="m-chat-footer__action-btn"
					title="В разработке"
				>
					<MicrophoneIcon/>
				</button>
			</div>
		</div>
	);
};

export default ChatFooter;