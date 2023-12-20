import { FC, memo, ReactElement } from 'react';

import { IMessage } from '../types';
import BotIcon from '../assets/images/bot-icon.png';
import UserIcon from '../assets/images/user-icon.png';

interface IProps {
	isMe: boolean;
	message: IMessage;
}

const Message: FC<IProps> = memo(({ isMe, message: { message, type_message} }): ReactElement => {
	return (
		<div className={ `m-chat-message ${isMe ? 'user' : ''}` }>
			<div className="m-chat-message__image">
				<img src={isMe ? UserIcon : BotIcon} alt="Avatar"/>
			</div>

			{
				type_message === 'message'
					? <div className="m-chat-message__text">{ message }</div>
					: <div className="m-chat-message__text"><img src={message} alt="Photo"/></div>
			}
		</div>
	);
});

export default Message;