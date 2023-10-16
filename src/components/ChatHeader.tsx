import { useElementHeight } from '../hooks/useElementHeight';

const ChatHeader = () => {
	const { elementRef, elementStyle } = useElementHeight('header');

	return (
		<div className="m-chat-header" ref={elementRef} style={elementStyle}>
			<div className="m-chat-header__title">Напишите нам, мы онлайн!</div>

			<button type="button" className="m-chat-header__btn" title="Свернуть чат"></button>
		</div>
	);
};

export default ChatHeader;