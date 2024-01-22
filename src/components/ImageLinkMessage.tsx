import { FC } from 'react';
import { MessageAvatar } from './MessageAvatar';

interface IProps {
	isMe: boolean;
	message: string;
	link?: string;
	photo?: string;
}

const ImageLinkMessage: FC<IProps> = ({ isMe, link, message, photo }) => {
	return (
		<div className={ `m-chat-message ${ isMe ? 'user' : '' }` }>
			<MessageAvatar isMe={isMe}/>

			<div className="m-chat-message__text">
				<img src={photo} alt={message}/>
				<a href={link} target="_blank">{message}</a>
			</div>
		</div>
	)
};

export default ImageLinkMessage;