import React, { FC, ReactElement } from 'react';
import BotIcon from '../assets/images/bot-icon.png';
import UserIcon from '../assets/images/user-icon.png';

interface IProps {
	isMe: boolean;
	message: string;
}

const Message: FC<IProps> = ({ isMe, message }): ReactElement => {
	return (
		<div className={ `m-chat-message ${isMe ? 'user' : ''}` }>
			<div className="m-chat-message__image">
				<img src={isMe ? UserIcon : BotIcon} alt="Avatar"/>
			</div>

			<div className="m-chat-message__text">{ message }</div>
		</div>
	);
};

export default Message;