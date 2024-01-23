import { FC, Fragment, memo, ReactElement } from 'react';
import ReactMarkdown, { Components } from 'react-markdown';

import { IMessage } from '../types';
import { MessageAvatar } from './MessageAvatar';
import { FeedbackIcon } from './icons';
import { useActions } from '../hooks/redux-hooks';

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

	const componentsOptions: Components = {
		a: ({ node, ...props}) => <a target="_blank" {...props}/>
	};

	const onFeedbackClickHandle = () => {
		console.log({id});
		togglePopup(true);
		setMessageId(id);
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