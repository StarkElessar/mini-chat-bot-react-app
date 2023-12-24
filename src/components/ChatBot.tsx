import './../assets/styles/chat.scss';

import { useEffect } from 'react';

import { openWSChanel, closeWSChanel, getAllRecipes } from '../store/slices/chat-slice';
import ChatHeader from './ChatHeader';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import { useAppDispatch, useAppSelector } from '../store';

const ChatBot = () => {
	const dispatch = useAppDispatch();
	const isOpen = useAppSelector((state) => state.chat.isOpen);

	useEffect(() => {
		dispatch(openWSChanel());
		dispatch(getAllRecipes());

		return () => {
			dispatch(closeWSChanel());
		};
	}, [dispatch]);

	return (
		<div className={ `m-chat ${isOpen ? 'is-open' : ''}` }>
			<ChatHeader/>
			<ChatBody/>
			<ChatFooter/>
		</div>
	);
};

export default ChatBot;