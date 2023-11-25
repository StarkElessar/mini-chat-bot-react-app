import { FC, useEffect } from 'react';
import { FC, RefObject, useEffect, useRef, useState } from 'react';

import ChatHeader from './ChatHeader';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import { useAppDispatch, useAppSelector } from '../store';
import { closeWSChanel, openWSChanel } from '../store/slices/chatSlice';

const App: FC = () => {
	const dispatch = useAppDispatch();
	const isOpen = useAppSelector((state) => state.chat.isOpen);

	useEffect(() => {
		dispatch(openWSChanel());

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

export default App;