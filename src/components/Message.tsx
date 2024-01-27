import {FC, Fragment, memo, ReactElement} from 'react';
import ReactMarkdown, { Components } from 'react-markdown';

import { IMessage } from '../types';
import BotIcon from '../assets/images/cookie-icon.svg';
import UserIcon from '../assets/images/user-icon.png';

interface IProps {
	isMe: boolean;
	message: IMessage;
}

const Message: FC<IProps> = memo(({ isMe, message: { message, type_message, first_message } }): ReactElement => {
	const componentsOptions: Components = {
		a: ({ node, ...props}) => <a target="_blank" {...props}/>
	};

	return (
		<div className={ `m-chat-message ${isMe ? 'user' : ''}` }>
			<div className="m-chat-message__image">
				<img src={isMe ? UserIcon : BotIcon} alt="Avatar"/>
			</div>

			{
				type_message === 'message'
					? (
						<div className="m-chat-message__text">
							<ReactMarkdown components={componentsOptions}>{message}</ReactMarkdown>

							{
								first_message && (
									<Fragment>
										<br/>
										<p>Новые рецепты каждый день в наших сообществах:</p>
										<ul>
											<li><a href="https://baking-academy.ru" target="_blank">- сайт</a></li>
											<li><a href="https://vk.com/dr.bakers" target="_blank">- группа ВК</a></li>
											<li><a href="https://t.me/drbakers" target="_blank">- TG</a></li>
											<li><a href="https://www.youtube.com/channel/UCWFzJbm0y5-m8DwV_SOBViA/featured" target="_blank">- YouTube</a></li>
										</ul>
										<p>Подписывайтесь!</p>
									</Fragment>
								)
							}
						</div>
					)
					: <div className="m-chat-message__text"><img src={message} alt="Photo"/></div>
			}
		</div>
	);
});

export default Message;