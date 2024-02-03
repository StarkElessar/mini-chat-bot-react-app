import { FC, Fragment, memo, ReactElement } from 'react';
import ReactMarkdown, { Components } from 'react-markdown';

import { IMessage } from '../types';
import { MessageAvatar } from './MessageAvatar';
import { FeedbackIcon } from './icons';
import { useActions, useAppSelector } from '../hooks/redux-hooks';

interface IProps {
	isMe: boolean;
	message: IMessage;
	canSendMessage: boolean;
}

const Message: FC<IProps> = memo((props): ReactElement => {
	const {
		isMe,
		canSendMessage,
		message: {
			message,
			type_message,
			id,
			has_feedback
		}
	} = props;
	const { togglePopup, setMessageId } = useActions();
	const allMessages = useAppSelector((state) => state.chat.messages);

	const componentsOptions: Components = {
		a: ({ node, ...props}) => <a target="_blank" {...props}/>
	};

	const onFeedbackClickHandle = () => {
		togglePopup(true);
		/**
		 * TODO: современем может быть выпилим этот костыль для бека..
		 * Бек не может находить id своих сообщений
		 * */
		const selectedMessageIndex = allMessages.findIndex((message) => message.id === id);

		if (selectedMessageIndex !== -1) {
			const message = allMessages[selectedMessageIndex - 1];
			setMessageId(message.id);
		}
	};

	return (
		<div className={ `m-chat-message ${isMe ? 'user' : 'bot'}` }>
			<MessageAvatar isMe={isMe}/>

			{
				type_message === 'message'
					? (
						<Fragment>
							<div className="m-chat-message__text">
								<ReactMarkdown components={componentsOptions}>{message}</ReactMarkdown>
							</div>
							{
								!isMe && !has_feedback && (
									<div className="m-chat-message__options">
										<button
											title="Дать оценку ответу"
											onClick={onFeedbackClickHandle}
											className="m-chat-message__button"
											disabled={!canSendMessage}
										>
											<FeedbackIcon/>
										</button>
									</div>
								)
							}
						</Fragment>
					) : (
						<div className="m-chat-message__text">
							<img src={ message } alt="Photo"/>
						</div>
					)
			}
		</div>
	);
});

export default Message;