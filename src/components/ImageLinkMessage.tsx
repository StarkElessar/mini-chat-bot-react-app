import { FC } from 'react';
import UserIcon from '../assets/images/user-icon.png';
import BotIcon from '../assets/images/cookie-icon.svg';

interface IProps {
	isMe: boolean;
	message: string;
	link?: string;
	photo?: string;
}

const ImageLinkMessage: FC<IProps> = ({ isMe, link, message, photo }) => {
	return (
		<div className={ `m-chat-message ${ isMe ? 'user' : '' }` }>
			<div className="m-chat-message__image">
				<img src={ isMe ? UserIcon : BotIcon } alt="Avatar"/>
			</div>

			<div className="m-chat-message__text">
				<img src={photo} alt={message}/>
				<a href={link} target="_blank">{message}</a>
			</div>
		</div>
	)
};

export default ImageLinkMessage;