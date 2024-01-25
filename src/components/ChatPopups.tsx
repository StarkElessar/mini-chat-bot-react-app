import { ChangeEvent, Fragment, MouseEvent, useState } from 'react';

import { useActions, useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { ChatAPI } from '../api/chat-api';
import CustomRating from './CustomRating';

const ChatPopups = () => {
	const isVisibleFeedbackPopup = useAppSelector(({ feedback }) => feedback.openedPopup);
	return (
		<Fragment>
			{ isVisibleFeedbackPopup && <FeedbackPopup/> }
		</Fragment>
	);
};

const FeedbackPopup = () => {
	const dispatch = useAppDispatch();
	const [rating, setRating] = useState(0);
	const [feedbackText, setFeedbackText] = useState('');
	const [isEmpty, setIsEmpty] = useState(false);
	const { isLoadingFeedback, messageId } = useAppSelector(({ feedback }) => feedback);
	const {
		togglePopup,
		setMessageId,
		changeFeedbackStatus
	} = useActions();

	const onClosePopup = ({ target, currentTarget }: MouseEvent<HTMLDivElement>) => {
		if (target !== currentTarget) return;
		togglePopup(false);
	};

	const onChangeFeedbackValue = ({ target: { value } }: ChangeEvent<HTMLTextAreaElement>) => {
		setFeedbackText(value)
		setIsEmpty(Boolean(!value));
	};

	const sendFeedback = async () => {
		if (!messageId || !feedbackText) {
			setIsEmpty(true);
			return;
		}

		try {
			const response = dispatch(ChatAPI.sendFeedback({ id: messageId, text_response: feedbackText, rating }));
			await response.unwrap();
			changeFeedbackStatus({ id: messageId });
		} catch (error) {
			console.log(error);
		} finally {
			setMessageId(null);
			setFeedbackText('');
			setRating(0);
			togglePopup(false);
		}
	};

	return (
		<div className="m-chat-popup" onClick={onClosePopup}>
			<div className="m-chat-popup__body">
				<div className="m-chat-popup__title">Оставить отзыв</div>

				<div>
					<textarea
						placeholder="Напишите короткий отзыв об ответе.."
						value={feedbackText}
						onChange={onChangeFeedbackValue}
						className={isEmpty ? 'is-empty' : ''}
					></textarea>
					{
						isEmpty &&
							<div className="m-chat-popup__message">
								Нельзя отправить отчет без отзыва!
							</div>
					}
				</div>

				<div className="m-chat-popup__rating">
					Дайте оценку ответу:
					<CustomRating rating={rating} setRating={setRating}/>
				</div>

				<button
					onClick={sendFeedback}
					className="m-chat-popup__button"
				>
					Отправить
				</button>

				{
					isLoadingFeedback && (
						<div className="m-chat-spinner">
							<span className="m-chat-spinner__loader"></span>
						</div>
					)
				}
			</div>
		</div>
	);
};

export default ChatPopups;