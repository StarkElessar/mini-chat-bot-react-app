import { FC } from 'react';

import UserIcon from '../assets/images/user-icon.png';
import BotIcon from '../assets/images/start-icon.png';

interface IProps {
	isMe: boolean;
}

export const MessageAvatar: FC<IProps> = ({ isMe }) => {
	return (
		<div className="m-chat-message__image">
			<img src={ isMe ? UserIcon : BotIcon } alt="Avatar"/>
		</div>
	);
};