import { useMemo } from 'react';
import { bindActionCreators, combineReducers } from 'redux';
import logger from 'redux-logger';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { chatActions, chatReducer } from './slices/chatSlice';

const rootReducer = combineReducers({
	chat: chatReducer,
})

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([logger]),
	devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useActions = () => {
	const dispatch = useDispatch();
	return useMemo(() => bindActionCreators({ ...chatActions }, dispatch), [dispatch]);
};